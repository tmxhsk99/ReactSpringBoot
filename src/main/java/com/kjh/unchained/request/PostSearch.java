package com.kjh.unchained.request;

import lombok.*;

import javax.validation.constraints.Size;

@Getter
@Setter
@ToString
@Builder
public class PostSearch {
    private static final int PAGE_MAX_SIZE = 2000;
    private static final int SEARCH_MAX_SIZE = 50;
    @Builder.Default
    private Integer page = 1;
    @Builder.Default
    private Integer size = 10;
    @Size(max = SEARCH_MAX_SIZE)
    private String title;
    @Size(max = SEARCH_MAX_SIZE)
    private String content;

    public long getOffset() {
        return (long) (Math.max(1, page) - 1) * Math.min(size, PAGE_MAX_SIZE);
    }


}
