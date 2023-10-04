package com.kjh.unchained.controller;

import com.kjh.unchained.request.post.PostCreate;
import com.kjh.unchained.request.post.PostEdit;
import com.kjh.unchained.request.post.PostSearch;
import com.kjh.unchained.response.PostListResponse;
import com.kjh.unchained.response.PostResponse;
import com.kjh.unchained.service.PostService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @DeleteMapping("/api/posts/{postId}")
    public void delete(@PathVariable long postId) {
        postService.delete(postId);
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PatchMapping("/api/posts/{postId}")
    public PostResponse edit(@PathVariable long postId, @RequestBody @Valid PostEdit request) {
        return postService.edit(postId, request);
    }

    @GetMapping("/api/posts")
    public PostListResponse getList(@ModelAttribute @Valid PostSearch postSearch) {
        log.info("[PostController:/post]" + postSearch.toString() + "\n");
        PostListResponse result = postService.getList(postSearch);
        log.info("[PostController:result]" + result.toString());
        return result;
    }

    @GetMapping("/api/posts/{postId}")
    public PostResponse get(@PathVariable(name = "postId") Long id) {
        PostResponse postResponse = postService.get(id);
        return postResponse;
    }

    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @PostMapping("/api/posts")
    public void posts_save(@RequestBody @Valid PostCreate request) throws Exception {
        postService.write(request);
    }

}
