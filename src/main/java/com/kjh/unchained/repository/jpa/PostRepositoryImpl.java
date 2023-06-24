package com.kjh.unchained.repository.jpa;

import com.kjh.unchained.domain.Post;
import com.kjh.unchained.domain.QPost;
import com.kjh.unchained.request.PostSearch;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.JPQLQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.kjh.unchained.domain.QPost.*;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {

    private final JPQLQueryFactory jpqlQueryFactory;

    @Override
    public List<Post> getList(PostSearch postSearch) {
        return jpqlQueryFactory.selectFrom(post)
                .where(
                        titleLike(postSearch.getTitle()),
                        contentLike(postSearch.getContent())
                )
                .limit(postSearch.getSize())
                .offset(postSearch.getOffset())
                .orderBy(post.id.desc())
                .fetch();
    }

    @Override
    public Integer getListCount(PostSearch postSearch) {
        return jpqlQueryFactory.selectFrom(post)
                .where(
                        titleLike(postSearch.getTitle()),
                        contentLike(postSearch.getContent())
                )
                .fetch().size();
    }

    private BooleanExpression titleLike(String title) {
        return StringUtils.hasText(title) ? post.title.like("%" + title + "%") : null;
    }

    private BooleanExpression contentLike(String content) {
        return StringUtils.hasText(content) ? post.content.like("%" + content + "%") : null;
    }
    //todo Post 엔티티에 유저 정보가 포함이 되면 해당 유저 정보조건으로 검색하는 로직을 추가 필요

}
