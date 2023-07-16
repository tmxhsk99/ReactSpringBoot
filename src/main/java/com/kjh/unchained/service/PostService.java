package com.kjh.unchained.service;

import com.kjh.unchained.domain.PostEditor;
import com.kjh.unchained.exception.PostNotFound;
import com.kjh.unchained.repository.jpa.PostRepository;
import com.kjh.unchained.domain.Post;
import com.kjh.unchained.request.PostCreate;
import com.kjh.unchained.request.PostEdit;
import com.kjh.unchained.request.PostSearch;
import com.kjh.unchained.response.PostListResponse;
import com.kjh.unchained.response.PostResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;

    @Transactional
    public PostResponse edit(Long id, PostEdit postEditDto) {

        Post post = postRepository.findById(id)
                .orElseThrow(PostNotFound::new);

        PostEditor.PostEditorBuilder editorBuilder = post.toEditor();

        PostEditor postEditor = editorBuilder
                .title(postEditDto.getTitle())
                .content(postEditDto.getContent())
                .build();

        post.edit(postEditor);

        return new PostResponse(post);
    }

    public Long write(PostCreate postCreateDto) {

        Post post = Post.builder()
                .title(postCreateDto.getTitle())
                .content(postCreateDto.getContent())
                .build();

        return postRepository.save(post).getId();
    }

    public PostResponse get(Long id) {

        Post post = postRepository.findById(id)
                .orElseThrow(PostNotFound::new);

        return new PostResponse(post);
    }


    public PostListResponse getList(PostSearch postSearch) {

        log.info("[PostService:postSearch]" + postSearch.toString());
        List<PostResponse> postResponseList = postRepository.getList(postSearch).stream()
                .map(PostResponse::new)
                .collect(Collectors.toList());

        long postTotalCount = postRepository.getListCount(postSearch).longValue();
        log.info("[PostService:postResponseList]" + postResponseList.toString());

        return PostListResponse.builder()
                .postList(postResponseList)
                .currentPage(postSearch.getPage())
                .pageSize(postSearch.getSize())
                .totalCount(postTotalCount)
                .build();
    }

    public void delete(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(PostNotFound::new);

        postRepository.delete(post);
    }
}
