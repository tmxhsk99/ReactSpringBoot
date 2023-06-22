package com.kjh.unchained.response;


import com.kjh.unchained.domain.Post;
import com.kjh.unchained.util.FormatUtil;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.ZoneId;
import java.time.ZoneOffset;

/**
 서비스 정책에 맞는 PostResponse
 1. 타이틀을 10글자로 제한된다.
 */
@Getter
@ToString
public class PostResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final String createdTime;
    private final String updatedTime;

    public PostResponse(Post post) {
        this.id = post.getId();
        this.title = post.getTitle().substring(0,Math.min(post.getTitle().length(),50));
        this.content = post.getContent();
        this.createdTime = post.getCreatedTime().atZone(ZoneOffset.UTC).format(FormatUtil.UTC_DATE_TIME);
        this.updatedTime = post.getUpdatedTime().atZone(ZoneOffset.UTC).format(FormatUtil.UTC_DATE_TIME);
    }

}
