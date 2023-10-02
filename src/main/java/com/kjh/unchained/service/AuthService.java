package com.kjh.unchained.service;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.AlreadyExistsUser;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.signup.SignUpRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    /**
     * 회원가입 요청을 받아 유효성 검증후 회원가입 처리를 진행한다.
     */
    public void signUp(SignUpRequest signUpRequest) {

        // 회원 중복 체크
        Optional<User> findUser = userRepository.findByEmail(signUpRequest.getEmail());

        if (findUser.isPresent()) {
            throw new AlreadyExistsUser();
        }

        // 회원 비밀번호 암호화
        User user = User.builder()
                .email(signUpRequest.getEmail())
                .password(encoder.encode(signUpRequest.getPassword()))
                .name(signUpRequest.getName())
                .build();

        // 회원 저장
        userRepository.save(user);

    }
}
