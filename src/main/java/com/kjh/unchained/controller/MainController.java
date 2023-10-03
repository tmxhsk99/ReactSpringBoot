package com.kjh.unchained.controller;

import com.kjh.unchained.springconfig.security.UserPrincipal;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @GetMapping("/")
    public String main() {
        return "메인 페이지 입니다";

    }

    @GetMapping("/user")
    public String user(@AuthenticationPrincipal UserPrincipal userPrincipal) {

        return "유저 페이지 입니다";

    }

    @GetMapping("/admin")
    public String admin() {
        return "관리자 페이지 입니다";

    }
}
