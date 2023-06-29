package com.kjh.unchained.response;


import com.kjh.unchained.domain.Post;
import com.kjh.unchained.util.FormatUtil;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.time.ZoneId;
import java.time.ZoneOffset;

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
        this.title = post.getTitle().substring(0,Math.min(post.getTitle().length(),100));
        this.content = post.getContent().substring(0, Math.min(post.getContent().length(), 10000));
        this.createdTime = post.getCreatedTime().atZone(ZoneOffset.UTC).format(FormatUtil.UTC_DATE_TIME);
        this.updatedTime = post.getUpdatedTime().atZone(ZoneOffset.UTC).format(FormatUtil.UTC_DATE_TIME);
    }

}
