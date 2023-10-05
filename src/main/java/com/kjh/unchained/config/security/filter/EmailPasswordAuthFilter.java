package com.kjh.unchained.config.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.Getter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;

import java.io.IOException;


public class EmailPasswordAuthFilter extends AbstractAuthenticationProcessingFilter {

    private final ObjectMapper objectMapper;

    public EmailPasswordAuthFilter(String loginUrl,ObjectMapper objectMapper) {
        // 로그인 시도하는 주소를 설정한다.
        super(loginUrl);
        this.objectMapper = objectMapper;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException, IOException, ServletException {
        EmailPassword emailPassword = objectMapper.readValue(request.getInputStream(), EmailPassword.class);
        // 토큰을 만든다 , 커스터마이징을 하지는 않는다.

        // 토큰을 만들어서 AuthenticationManager에게 넘겨준다.
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(
                emailPassword.getEmail(),
                emailPassword.getPassword()
        );
        token.setDetails(this.authenticationDetailsSource.buildDetails(request));
        return this.getAuthenticationManager().authenticate(token);

    }

    @Getter
    private static class EmailPassword {
        private String email;
        private String password;
    }
}
