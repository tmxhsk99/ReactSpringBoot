package com.kjh.unchained.controller;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.InvalidSigninInformation;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.login.Login;
import com.kjh.unchained.response.SessionResponse;
import com.kjh.unchained.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final AuthService authService;

    @PostMapping("/api/auth/login")
    public SessionResponse login(@RequestBody @Valid Login login) {

        String accessToken = authService.signIn(login);

        return new SessionResponse(accessToken);

    }

}
