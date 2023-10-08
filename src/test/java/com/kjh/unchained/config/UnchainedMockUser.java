package com.kjh.unchained.config;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * admin 계정으로 인증된 SecurityContext를 생성하는 어노테이션
 */
@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = UnchainedMockSecurityContext.class)
public @interface UnchainedMockUser {

    String name() default "kimjuhyeon";

    String email() default "admin@unchained.com";

    String password() default "1234";

    String role() default "ROLE_ADMIN";

}
