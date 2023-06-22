package com.kjh.unchained.vo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PageInfo {
    private final Integer currentPage;
    private final Integer pageSize;
    private final Long totalCount;

    @Builder
    public PageInfo(Integer currentPage, Integer pageSize, Long totalCount) {
        this.currentPage = currentPage;
        this.pageSize = pageSize;
        this.totalCount = totalCount;
    }
}
