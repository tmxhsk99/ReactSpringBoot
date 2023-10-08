package com.kjh.unchained.config;

import com.kjh.unchained.config.security.UserPrincipal;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

import java.util.List;

/**
 * admin 계정으로 인증된 SecurityContext를 생성하는 어노테이션 구현체
 */
@RequiredArgsConstructor
public class UnchainedMockSecurityContext implements WithSecurityContextFactory<UnchainedMockUser> {

    private final UserRepository userRepository;

    // 인증테스트를 위한 회원 인증객체
    @Override
    public SecurityContext createSecurityContext(UnchainedMockUser annotation) {
        var user = User.builder()
                .email(annotation.email())
                .name(annotation.name())
                .password(annotation.password())
                .build();

        userRepository.save(user);

        var principal = new UserPrincipal(user);

        var role = new SimpleGrantedAuthority("ROLE_ADMIN");
        var authenticationToken = new UsernamePasswordAuthenticationToken(
                principal,
                user.getPassword(),
                List.of(role));


        var context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authenticationToken);

        return context;
    }
}
