package com.kjh.unchained.exception;

import org.springframework.http.HttpStatus;

public class CommentNotFound extends MyBaseException {

    private static final String MESSAGE = "존재하지 않는 댓글입니다.";

    public CommentNotFound() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return HttpStatus.NOT_FOUND.value();
    }
}
