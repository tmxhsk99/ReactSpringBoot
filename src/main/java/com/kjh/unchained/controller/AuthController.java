package com.kjh.unchained.controller;

import com.kjh.unchained.request.signup.SignUpRequest;
import com.kjh.unchained.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    /**
     * 로그인
     */
    @GetMapping("/api/auth/login")
    public String login() {

        return "로그인 페이지 입니다";

    }

    /**
     * 회원가입
     */
    @PostMapping("/api/auth/signup")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void signUp(@RequestBody SignUpRequest signUpRequest) {

        authService.signUp(signUpRequest);

    }


    /**
     * 로그아웃 처리
     */
    @PostMapping("/api/auth/signout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void signOut() {

        ResponseCookie cookie = ResponseCookie.from("SESSION", "")
                .domain("localhost") // todo 서버 환경에 따른 분리 필요
                .httpOnly(true)
                .path("/")
                .secure(false) // todo https 적용시 true 로 변경
                .maxAge(Duration.ZERO)
                .sameSite("Strict")
                .build();

        log.info(">>>>>> cookie : {}", cookie);

    }

}
