package com.kjh.unchained.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.AlreadyExistsUser;
import com.kjh.unchained.exception.InvalidSigninInformation;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.login.Login;
import com.kjh.unchained.testutil.fixture.AuthFixture;
import com.kjh.unchained.util.PasswordEncoderUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.*;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.MethodSource;
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
    class signIn_메서드는 {

        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청_로그인정보가_유효한경우 {
            private Long VALID_USER_ID;

            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
                User user = userRepository.save(AuthFixture.getValidUserWithEncodedPassword());
                VALID_USER_ID = user.getId();
            }

            @Test
            @DisplayName("로그인 유저 아이디를 반환한다")
            void it_returns_user_id() throws Exception {

                Long userId = authService.signIn(AuthFixture.getValidLoginRequest());

                Assertions.assertThat(userId).isEqualTo(VALID_USER_ID);
            }
        }

        @Nested
        @DisplayNameGeneration(DisplayNameGenerator.ReplaceUnderscores.class)
        class 요청_로그인정보가_유효하지_않은경우 {
            @BeforeEach
            void setUp() {
                userRepository.deleteAll();
                userRepository.save(AuthFixture.getValidUserWithEncodedPassword());
            }

            @DisplayName("InvalidSigninInformation 예외를 반환한다")
            @ParameterizedTest
            @MethodSource("com.kjh.unchained.testutil.fixture.AuthFixture#provideInvalidLoginRequest")
            void it_returns_invalid_signin_information_exception(Login login) throws Exception {
                
                //when
                Assertions.assertThatThrownBy(() -> authService.signIn(login))
                        .isInstanceOf(InvalidSigninInformation.class);
            }

        }
    }

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
