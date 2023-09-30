package com.kjh.unchained.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.service.AuthService;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import javax.crypto.SecretKey;
import java.util.Base64;


@SpringBootTest
@AutoConfigureMockMvc
@SuppressWarnings({"InnerClassMayBeStatic", "NonAsciiCharacters"})
@DisplayName("AuthController 클래스")
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;


    @Test
    @DisplayName("키 생성 테스트")
    public void test() {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String strKey = new String(Base64.getEncoder().encode(key.getEncoded()));
        System.out.println(strKey);
    }
}
