package com.kjh.unchained.request.post;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class PostEdit {
    private Long id;

    @NotBlank(message = "타이틀을 입력해주세요.")
    @Size(max = 100, message = "타이틀은 100자 이내로 입력해주세요.")
    private String title;

    @NotBlank(message = "내용를 입력해주세요")
    @Size(max = 1000, message = "내용은 1000자 이내로 입력해주세요.")
    private String content;

    public PostEdit() {
    }

    public PostEdit(Long id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }
}
