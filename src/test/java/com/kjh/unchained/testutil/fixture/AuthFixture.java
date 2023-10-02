package com.kjh.unchained.testutil.fixture;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.request.signup.SignUpRequest;


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


}
