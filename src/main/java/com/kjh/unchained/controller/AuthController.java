package com.kjh.unchained.controller;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.InvalidSigninInformation;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.login.Login;
import com.kjh.unchained.response.SessionResponse;
import com.kjh.unchained.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.time.Duration;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/api/auth/login")
    public ResponseEntity<?> login(@RequestBody @Valid Login login) {

        String accessToken = authService.signIn(login);

        ResponseCookie cookie = ResponseCookie.from("SESSION", accessToken)
                .domain("localhost") // todo 서버 환경에 따른 분리 필요
                .httpOnly(true)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .maxAge(Duration.ofDays(30))
                .sameSite("Strict")
                .build();

        log.info(">>>>>> cookie : {}", cookie);

        return ResponseEntity.noContent()
                .header(HttpHeaders.SET_COOKIE, cookie.toString()).build();
    }
}
