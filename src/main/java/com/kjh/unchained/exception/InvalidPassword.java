package com.kjh.unchained.exception;

import org.springframework.http.HttpStatus;

public class InvalidPassword extends MyBaseException {

    private static final String MESSAGE = "비밀번호가 올바르지 않습니다.";

    public InvalidPassword() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return HttpStatus.BAD_REQUEST.value();
    }
}
