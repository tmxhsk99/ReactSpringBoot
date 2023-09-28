package com.kjh.unchained.service;

import com.kjh.unchained.domain.Session;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.InvalidSigninInformation;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.login.Login;
import com.kjh.unchained.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    @Transactional
    public Long signIn(Login request) {
        // DB 에서 조회
        User user = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword())
                .orElseThrow(InvalidSigninInformation::new);

        // 세션 생성
        user.addSession(jwtUtil);

        return user.getId();
    }
}
