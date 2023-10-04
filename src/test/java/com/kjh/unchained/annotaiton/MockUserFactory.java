package com.kjh.unchained.annotaiton;

import com.kjh.unchained.repository.jpa.user.UserRepository;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

/**
 * 나중에 WithMockUser로 여러 유저 어노테이션을 만들어서 테스트할수 있도록 하기위한 어노테이션
 * 현재는 역할과 권한이 단순하므로 사용하지 않음
 */
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
