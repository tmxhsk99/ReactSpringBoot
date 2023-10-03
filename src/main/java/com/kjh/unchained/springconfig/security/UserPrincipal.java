package com.kjh.unchained.springconfig.security;

import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.List;

public class UserPrincipal extends User {

    private final Long userId;

    // role : 역할 -> 관리자,사용자,매니저
    // authority : 권한 -> 읽기,쓰기,수정,삭제,사용자 정지 시키기


    public UserPrincipal(com.kjh.unchained.domain.User user) {

        super(
                user.getEmail(),
                user.getPassword(),
                List.of(
                        new SimpleGrantedAuthority("ROLE_ADMIN"), // ROLE_ 를 붙여줘야함 그래야 역할로인식함 (권한은 그냥 쓰면됨),
                        new SimpleGrantedAuthority("WRITE")
                )
        );
        this.userId = user.getId();
    }

    public Long getUserId() {
        return userId;
    }
}
