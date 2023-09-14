package com.kjh.unchained.repository.jpa.post;

import com.kjh.unchained.domain.Post;
import com.kjh.unchained.request.post.PostSearch;

import java.util.List;

public interface PostRepositoryCustom {

    List<Post> getList(PostSearch postSearch);

    Integer getListCount(PostSearch postSearch);
}
