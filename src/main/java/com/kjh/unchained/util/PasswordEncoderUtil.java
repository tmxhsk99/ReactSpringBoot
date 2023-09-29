package com.kjh.unchained.util;

import org.springframework.security.crypto.scrypt.SCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class PasswordEncoderUtil {

    private final SCryptPasswordEncoder encoder;

    private int cpuCost = 16384;
    private int memoryCost = 8;
    private int parallelization = 1;
    private int keyLength = 32;
    private int saltLength = 64;

    public PasswordEncoderUtil() {

        this.encoder = new SCryptPasswordEncoder(
                cpuCost,
                memoryCost,
                parallelization,
                keyLength,
                saltLength
        );
    }

    public String encode(String password) {
        return encoder.encode(password);

    }

    public boolean matches(String password, String encodedPassword) {
        return encoder.matches(password, encodedPassword);
    }

}
