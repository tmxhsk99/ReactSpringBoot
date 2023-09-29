package com.kjh.unchained.exception;

import com.kjh.unchained.domain.User;
import org.springframework.http.HttpStatus;

public class AlreadyExistsUser extends MyBaseException {
    private static String MESSAGE = "이미 존재하는 유저입니다.";

    public AlreadyExistsUser() {
        super(MESSAGE);
    }

    public AlreadyExistsUser(User user) {
        super(MESSAGE);
    }

    @Override
    public int getStatusCode() {
        return HttpStatus.CONFLICT.value();
    }
}
