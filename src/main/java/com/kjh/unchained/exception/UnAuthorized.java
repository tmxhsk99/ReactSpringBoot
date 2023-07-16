package com.kjh.unchained.exception;

public class UnAuthorized extends MyBaseException{

    private static final String MESSAGE = "권한이 없습니다.";

    public UnAuthorized() {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return 401;
    }
}
