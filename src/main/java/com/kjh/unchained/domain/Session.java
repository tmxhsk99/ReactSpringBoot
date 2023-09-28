package com.kjh.unchained.domain;

import com.kjh.unchained.springconfig.app.JwtAppConfig;
import com.kjh.unchained.util.JwtUtil;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.UUID;

import static java.util.UUID.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String accessToken;

    @ManyToOne
    private User user;

    @Builder
    public Session(User user, JwtUtil jwtUtil) {
        String jws = jwtUtil.createJws(user.getId());
        this.accessToken = jws;
        this.user = user;
    }
}
