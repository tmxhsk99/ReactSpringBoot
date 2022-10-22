package com.kjh.unchained.repository;

import com.kjh.unchained.domain.Post;
import com.kjh.unchained.request.PostSearch;

import java.util.List;

public interface PostRepositoryCustom {

    List<Post> getList(PostSearch postSearch);
}
