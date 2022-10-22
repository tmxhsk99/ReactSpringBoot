package com.kjh.unchained.repository;

import com.kjh.unchained.domain.Post;
import com.kjh.unchained.domain.QPost;
import com.kjh.unchained.request.PostSearch;
import com.querydsl.jpa.JPQLQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public List<Post> getList(PostSearch postSearch) {
        return jpqlQueryFactory.selectFrom(QPost.post)
                .limit(postSearch.getSize())
                .offset(postSearch.getOffset())
                .orderBy(QPost.post.id.desc())
                .fetch();
    }
}
