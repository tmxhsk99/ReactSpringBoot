package com.kjh.unchained.request.comment;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class CommentDelete {

    @NotBlank(message = "비밀번호를 입력해주세요.")
    String password;
}
