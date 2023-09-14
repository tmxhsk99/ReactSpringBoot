package com.kjh.unchained.request.login;

import lombok.Getter;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

@Getter
public class Login {
    @NotBlank(message = "이메일을 입력해주세요.")
    private String email;
    @NotBlank(message = "패스워드를 입력해주세요.")
    private String password;

    public Login() {
    }

    public Login(String email, String password) {
        this.email = email;
        this.password = password;
    }
}
