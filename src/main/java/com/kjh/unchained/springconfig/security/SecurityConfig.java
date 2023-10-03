package com.kjh.unchained.springconfig.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.springconfig.security.handler.Http401Handler;
import com.kjh.unchained.springconfig.security.handler.Http403Handler;
import com.kjh.unchained.springconfig.security.handler.LoginFailHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final ObjectMapper objectMapper;

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
                .requestMatchers(toH2Console())
                .requestMatchers(new AntPathRequestMatcher("/favicon.ico"))
                .requestMatchers(new AntPathRequestMatcher("/error"))
                .requestMatchers(new AntPathRequestMatcher("/css/**"))
                .requestMatchers(new AntPathRequestMatcher("/js/**"))
                .requestMatchers(new AntPathRequestMatcher("/img/**"))
                .requestMatchers(new AntPathRequestMatcher("/lib/**"));
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, HandlerMappingIntrospector introspector) throws Exception {

        String loginRequestURL = "/api/auth/login";

        http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(request -> request
                        .requestMatchers(new AntPathRequestMatcher(loginRequestURL)).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/api/auth/signup")).permitAll()
                        .requestMatchers(new AntPathRequestMatcher("/user")).hasAnyRole("USER")
                        .requestMatchers(new AntPathRequestMatcher("/admin")).hasAnyRole("ADMIN")
                        .anyRequest().authenticated()
                )
                .formLogin(form ->
                        form.loginPage(loginRequestURL)
                                .loginProcessingUrl(loginRequestURL)
                                .usernameParameter("email")
                                .passwordParameter("password")
                                .defaultSuccessUrl("/")
                                .failureHandler(new LoginFailHandler(objectMapper))
                )
                .rememberMe(rememberMe ->
                        rememberMe.rememberMeParameter("remember") // 어떤 파라미터로 값이 넘어와야 자동로그인으로 설정할건지 설정
                                .rememberMeCookieName("remember-me") // 쿠키 이름 설정
                                .alwaysRemember(false) // true 로 설정하면, remember-me 쿠키가 없어도 항상 자동로그인
                                .tokenValiditySeconds(60 * 60 * 24 * 30) // 쿠키 유효기간 설정 (30일)

                )
                .exceptionHandling(
                        e -> {
                            e.accessDeniedHandler(new Http403Handler(objectMapper)); // 권한이 없을때
                            e.authenticationEntryPoint(new Http401Handler(objectMapper)); // 인증이 안됐을때
                        }
                )
                .httpBasic(withDefaults());


        return http.build();

    }

    @Bean
    public UserDetailsService userDetailsService(UserRepository userRepository) {
        return username -> {
            User user = userRepository.findByEmail(username)
                    .orElseThrow(() -> new UsernameNotFoundException(username + "를 찾을 수 없습니다."));

            return new UserPrincipal(user);
        };
    }

    @Bean
    public PasswordEncoder passwordEncoder() {

        int cpuCost = 16384;
        int memoryCost = 8;
        int parallelization = 1;
        int keyLength = 32;
        int saltLength = 64;

        return new SCryptPasswordEncoder(
                cpuCost,
                memoryCost,
                parallelization,
                keyLength,
                saltLength
        );
    }
}
