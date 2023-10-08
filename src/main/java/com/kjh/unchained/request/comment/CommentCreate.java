package com.kjh.unchained.request.comment;


import com.kjh.unchained.domain.Comment;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;

@Getter
public class CommentCreate {

    @Length(min = 1, max = 20, message = "작성자는 1자 이상 20자 이하로 입력해주세요.")
    @NotBlank(message = "작성자를 입력해주세요.")
    private String author;

    @Length(min = 1, max = 1000, message = "내용은 1자 이상 1000자 이하로 입력해주세요.")
    @NotBlank(message = "내용을 입력해주세요.")
    private String content;

    @Length(min = 6, max = 30, message = "비밀번호는 6자 이상 30자 이하로 입력해주세요.")
    @NotBlank(message = "비밀번호를 입력해주세요.")
    private String password;

    @Builder
    public CommentCreate(String author, String content, String password) {
        this.author = author;
        this.content = content;
        this.password = password;
    }

}
