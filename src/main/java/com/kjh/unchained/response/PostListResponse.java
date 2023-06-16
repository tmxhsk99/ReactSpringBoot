package com.kjh.unchained.response;


import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
@ToString
@Getter
public class PostListResponse {
    private final long totalCount;
    private final List<PostResponse> postList;
    @Builder
    public PostListResponse(long totalCount, List<PostResponse> postResponseList) {
        this.totalCount = totalCount;
        this.postList = postResponseList;
    }
}
