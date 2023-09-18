package com.kjh.unchained.springconfig.web.data;

import lombok.Getter;

@Getter
public class UserSession {

    private final Long id;

    public UserSession(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return String.format("UserSession{ id = %d }", id);
    }
}
