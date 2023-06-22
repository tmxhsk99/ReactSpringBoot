package com.kjh.unchained.response;


import com.kjh.unchained.vo.PageInfo;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

import java.util.List;
@ToString
@Getter
public class PostListResponse {
    private final PageInfo pageInfo;
    private final List<PostResponse> postList;

    @Builder
    public PostListResponse(Long totalCount, Integer pageSize, Integer currentPage, List<PostResponse> postList) {
        this.pageInfo = PageInfo.builder()
                .currentPage(currentPage)
                .pageSize(pageSize)
                .totalCount(totalCount)
                .build();
        this.postList = postList;
    }
}
