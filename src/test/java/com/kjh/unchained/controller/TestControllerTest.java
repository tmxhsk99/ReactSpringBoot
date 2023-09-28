package com.kjh.unchained.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.domain.Session;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.testutil.fixture.AuthFixture;
import com.kjh.unchained.util.JwtUtil;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

import javax.servlet.http.Cookie;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@SuppressWarnings({"InnerClassMayBeStatic", "NonAsciiCharacters"})
@DisplayName("TestController 클래스")
class TestControllerTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Autowired
    JwtUtil jwtUtil;


    @Nested
    @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
    class testUserSession_메서드는 {

        private Session session;

        @BeforeEach
        void setUp() {
            userRepository.deleteAll();
            User user = AuthFixture.getValidUser();
            session = user.addSession(jwtUtil);
            userRepository.save(user);
        }
        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청메시지의_세션이_유효한경우 {

            @DisplayName("세션 정보를 반환한다.")
            @Test
            void It_returns_session_information() throws Exception {

                String accessToken = session.getAccessToken();
                Cookie sessionCookie = new Cookie("SESSION", accessToken);

                mockMvc.perform(get("/api/test/session")
                                .cookie(sessionCookie)
                                .contentType("application/json"))
                        .andExpect(status().isOk())
                        .andDo(print());
            }

        }

        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청_메시지의_세션이_유효하지_않은경우 {

            @DisplayName("UnAuthorized 예외를 반환한다.")
            @Test
            void It_returns_session_information() throws Exception {
                Cookie sessionCookie = new Cookie("SESSION", session.getAccessToken() +"INVALID");
                mockMvc.perform(get("/api/test/session")
                                .cookie(sessionCookie)
                                .contentType("application/json"))
                        .andExpect(status().isUnauthorized())
                        .andDo(print());
            }

        }
    }

}
