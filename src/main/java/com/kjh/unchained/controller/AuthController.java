package com.kjh.unchained.controller;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.InvalidSigninInformation;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.login.Login;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@Slf4j
@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/api/auth/login")
    public User login(@RequestBody @Valid Login login) {
        // json 아이디 / 비밀번호
        log.info(">>>login= {}", login);

        // DB 에서 조회
        User user = userRepository.findByEmailAndPassword(login.getEmail(), login.getPassword())
                .orElseThrow(InvalidSigninInformation::new);
        //todo  토큰 응답 으로 변경할 것
        return user;
    }
}
