package com.kjh.unchained.testutil.fixture;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.request.login.Login;
import com.kjh.unchained.request.signup.SignUpRequest;
import com.kjh.unchained.util.PasswordEncoderUtil;
import org.junit.jupiter.params.provider.Arguments;

import java.util.stream.Stream;

public class AuthFixture {

    public static final String VALID_EMAIL = "admin@unchained.com";
    public static final String VALID_PASSWORD = "1234";
    public static final String VALID_NAME = "kimjuhyeon";
    private static PasswordEncoderUtil encoderUtil = new PasswordEncoderUtil();

    public static User getValidUser() {
        return User.builder()
                .name("김주현")
                .email(VALID_EMAIL)
                .password(VALID_PASSWORD)
                .build();
    }

    public static Login getValidLoginRequest() {
        return Login.builder()
                .email(VALID_EMAIL)
                .password(VALID_PASSWORD)
                .build();
    }

    public static Login getInValidLoginRequest_InvalidEmail() {
        return Login.builder()
                .email(VALID_EMAIL + "invalid")
                .password(VALID_PASSWORD)
                .build();
    }

    public static Login getInValidLoginRequest_InvalidPassword() {
        return Login.builder()
                .email(VALID_EMAIL)
                .password(VALID_PASSWORD + "invalid")
                .build();
    }

    public static SignUpRequest getValidSignUpRequest() {
        return SignUpRequest.builder()
                .email(VALID_EMAIL)
                .password(VALID_PASSWORD)
                .name(VALID_NAME)
                .build();
    }

    public static User getValidUserWithEncodedPassword() {
        User validUser = AuthFixture.getValidUser();
        String password = validUser.getPassword();
        String encode = encoderUtil.encode(password);
        User passwordEncodeUser = User.builder()
                .email(validUser.getEmail())
                .password(encode)
                .name(validUser.getName())
                .build();

        return passwordEncodeUser;
    }

    public static Stream<Arguments> provideInvalidLoginRequest() {
        return Stream.of(
                Arguments.of(getInValidLoginRequest_InvalidEmail()),
                Arguments.of(getInValidLoginRequest_InvalidPassword())
        );
    }
}
