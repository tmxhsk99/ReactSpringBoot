package com.kjh.unchained.springconfig.web.data;

public class UserSession {

    private final Long id;

    public UserSession(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "UserSession{" +
                "id=" + id +
                '}';
    }
}
