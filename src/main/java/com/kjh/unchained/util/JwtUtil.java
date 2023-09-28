package com.kjh.unchained.util;

import com.kjh.unchained.springconfig.app.JwtAppConfig;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.util.Date;


@RequiredArgsConstructor
@Component
public class JwtUtil {

    private final JwtAppConfig jwtAppConfig;

    public String createJws (Long userId){
        SecretKeySpec secretKey = new SecretKeySpec(jwtAppConfig.jwtSecretKey, SignatureAlgorithm.HS256.getJcaName());

        String jws = Jwts.builder()
                .setSubject(String.valueOf(userId))
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtAppConfig.expiration))
                .signWith(secretKey)
                .compact();

        return jws;
    }
}
