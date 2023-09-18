package com.kjh.unchained.controller;

import com.kjh.unchained.springconfig.web.data.UserSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 테스트를 위한 컨트롤러 클래스 도메인에 속하지 않는 요청들을 검증할때 사용하는 컨트롤러이다.
 */
@RestController
@Slf4j
@RequiredArgsConstructor
public class TestController {

    /**
     * 세션 테스트를 위한 컨트롤러 메서드
     * @param userSession
     * @return
     */
    @GetMapping("/api/test/session")
    public Long testUserSession(UserSession userSession) {
        log.info("userSession: {}", userSession);
        return userSession.getId();

    }


}
