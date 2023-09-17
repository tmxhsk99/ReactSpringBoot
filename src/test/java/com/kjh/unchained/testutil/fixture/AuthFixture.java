package com.kjh.unchained.testutil.fixture;

import com.kjh.unchained.domain.User;
import com.kjh.unchained.request.login.Login;

public class AuthFixture {

    public static final String VALID_EMAIL = "admin@unchained.com";
    public static final String VALID_PASSWORD = "1234";


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
}
