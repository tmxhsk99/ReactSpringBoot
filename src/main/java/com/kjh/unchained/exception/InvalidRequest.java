package com.kjh.unchained.exception;

import org.springframework.http.HttpStatus;

public class InvalidRequest extends MyBaseException {

    private static final String MESSAGE = "잘못된 요청입니다.";


    public InvalidRequest() {
        super(MESSAGE);
    }

    public InvalidRequest(String fieldName, String message) {
        super(MESSAGE);
        addValidation(fieldName, message);
    }


    @Override
    public int getStatusCode() {
        return HttpStatus.BAD_REQUEST.value();
    }
}
