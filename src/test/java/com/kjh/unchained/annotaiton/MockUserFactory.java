package com.kjh.unchained.annotaiton;

import com.kjh.unchained.repository.jpa.user.UserRepository;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class MockUserFactory implements WithSecurityContextFactory<CustomWithMockUser> {

    private UserRepository userRepository;
    @Override
    public SecurityContext createSecurityContext(CustomWithMockUser annotation) {
        int level = annotation.level();
        String username = annotation.username();
        String password = annotation.password();


        //userRepository.save();
        return null;
    }
}
