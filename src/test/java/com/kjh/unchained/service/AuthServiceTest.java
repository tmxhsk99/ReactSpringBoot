package com.kjh.unchained.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.exception.AlreadyExistsUser;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.testutil.fixture.AuthFixture;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
@SuppressWarnings({"InnerClassMayBeStatic", "NonAsciiCharacters"})
@DisplayName("AuthService 클래스")
class AuthServiceTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    AuthService authService;

    @Autowired
    PasswordEncoderUtil encoderUtil;

    @Autowired
    UserRepository userRepository;

    @Nested
    @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
    class signUp_메서드는 {


        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청_회원가입정보가_존재하지않는경우 {
            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
            }

            @Test
            @DisplayName("회원가입을 처리한다.")
            void it_signs_up() throws Exception {
                authService.signUp(AuthFixture.getValidSignUpRequest());

                userRepository.findByEmail(AuthFixture.VALID_EMAIL)
                        .ifPresent(user -> {
                            Assertions.assertThat(user.getEmail()).isEqualTo(AuthFixture.VALID_EMAIL);
                            Assertions.assertThat(encoderUtil.matches(AuthFixture.VALID_PASSWORD, user.getPassword())).isTrue();
                            Assertions.assertThat(user.getName()).isEqualTo(AuthFixture.VALID_NAME);
                        });
            }

        }

        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청_회원가입정보가_존재하는경우 {
            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
                userRepository.save(AuthFixture.getValidUserWithEncodedPassword());
            }

            @Test
            @DisplayName("이미 존재하는 회원이면 예외를 발생시킨다.")
            void it_throws_exception_when_user_already_exists() throws Exception {
                //given
                Assertions.assertThatThrownBy(() -> authService.signUp(AuthFixture.getValidSignUpRequest()))
                        .isInstanceOf(AlreadyExistsUser.class);
            }
        }
    }
}
