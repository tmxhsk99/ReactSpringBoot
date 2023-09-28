package com.kjh.unchained.springconfig.app;

import lombok.Getter;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
public class JwtAppConfig {
    public byte[] jwtSecretKey;
    public long expiration;

    public void setSecret(String secret) {
        this.jwtSecretKey = Base64.decodeBase64(secret);
    }

    public void setExpiration(long expiration) {
        this.expiration = expiration;
    }

}
