package com.kjh.unchained.annotaiton;

import org.springframework.security.test.context.support.WithSecurityContext;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = MockUserFactory.class)
public @interface CustomWithMockUser {

    String username() default "";

    String password() default "";

    int level() default 5;

    String mobileNumber = "01000000000";


}
