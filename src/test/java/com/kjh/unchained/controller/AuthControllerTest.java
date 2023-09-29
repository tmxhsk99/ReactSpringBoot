package com.kjh.unchained.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.repository.jpa.session.SessionRepository;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.login.Login;
import com.kjh.unchained.service.AuthService;
import com.kjh.unchained.testutil.fixture.AuthFixture;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import javax.crypto.SecretKey;
import java.util.Base64;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


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

    @Autowired
    SessionRepository sessionRepository;

    @Nested
    @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
    class signIn_메서드는 {

        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청_로그인정보가_유효한경우 {
            private Login VALID_LOGIN;
            private User LOGIN_USER;

            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
                LOGIN_USER = userRepository.save(AuthFixture.getValidUserWithEncodedPassword());
                VALID_LOGIN = AuthFixture.getValidLoginRequest();
            }


            @Test
            @DisplayName("로그인 성공시 204 NO Content를 반환한다")
            void it_returns_200_OK_when_login_is_successful() throws Exception {
                //when
                mockMvc.perform(post("/api/auth/login")
                                .contentType("application/json")
                                .content(objectMapper.writeValueAsString(VALID_LOGIN)))
                        .andDo(print())
                        .andExpect(status().isNoContent());
            }
            

            @Test
            @DisplayName("정상적인 로그인 성공 후 쿠키에 세션정보를 반환한다.")
            void it_returns_session_after_successful_login() throws Exception {
                //when
                String response = mockMvc.perform(post("/api/auth/login")
                                .contentType("application/json")
                                .content(objectMapper.writeValueAsString(VALID_LOGIN)))
                        .andDo(print())
                        .andExpect(status().isNoContent())
                        .andReturn().getResponse().getHeader("Set-Cookie");

                //then
                Assertions.assertThat(response)
                        .contains("SESSION");
            }
        }
    }

    @Test
    @DisplayName("키 생성 테스트")
    public void test() {
        SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);
        String strKey = new String(Base64.getEncoder().encode(key.getEncoded()));
        System.out.println(strKey);
    }
}
