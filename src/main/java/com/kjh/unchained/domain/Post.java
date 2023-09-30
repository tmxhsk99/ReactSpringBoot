package com.kjh.unchained.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Table(name = "post")
public class Post {
    // todo 유저 엔티티 추가시 관련 속성 추가해야한다.author 엔티티 작성
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100, nullable = false)
    private String title;

    @Lob    //DB 저장시에는 LongText
    private String content;

    private LocalDateTime createdTime;

    private LocalDateTime updatedTime;

    @Builder
    public Post(String title, String content) {
        this.title = title;
        this.content = content;
        this.createdTime = LocalDateTime.now();
        this.updatedTime = LocalDateTime.now();
    }

    public PostEditor.PostEditorBuilder toEditor() {
        return PostEditor.builder()
                .title(this.title)
                .content(this.content);
    }

    public void edit(PostEditor postEditor) {
        this.title = postEditor.getTitle();
        this.content = postEditor.getContent();
        this.updatedTime = postEditor.getUpdatedTime();
    }

}
