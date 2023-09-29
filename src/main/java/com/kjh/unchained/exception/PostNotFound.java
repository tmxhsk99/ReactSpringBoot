package com.kjh.unchained.exception;

import org.springframework.http.HttpStatus;

public class PostNotFound extends MyBaseException {

    private static final String MESSAGE = "존재하지 않는 글입니다.";

    public PostNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return HttpStatus.NOT_FOUND.value();
    }
}
