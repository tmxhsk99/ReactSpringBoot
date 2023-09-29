package com.kjh.unchained.exception;

import org.springframework.http.HttpStatus;

public class InvalidSigninInformation extends MyBaseException {

    private static final String MESSAGE = "이메일 또는 비밀번호가 일치하지 않습니다.";

    public InvalidSigninInformation() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return HttpStatus.UNAUTHORIZED.value();
    }
}
