package com.kjh.unchained.exception;

import org.springframework.http.HttpStatus;

public class UserNotFoundException extends MyBaseException {

    private static final String MESSAGE = "존재하지 않는 유저입니다.";

    public UserNotFoundException() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return HttpStatus.NOT_FOUND.value();
    }
}
