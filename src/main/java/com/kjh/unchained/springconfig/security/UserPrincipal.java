package com.kjh.unchained.springconfig.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public class UserPrincipal extends User {

    private final Long userId;

    public UserPrincipal(com.kjh.unchained.domain.User user) {

        super(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority("ADMIN"))
        );
        this.userId = user.getId();
    }

    public Long getUserId() {
        return userId;
    }
}
