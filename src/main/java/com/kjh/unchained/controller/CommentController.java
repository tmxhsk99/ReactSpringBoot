package com.kjh.unchained.controller;

import com.kjh.unchained.request.comment.CommentCreate;
import com.kjh.unchained.request.comment.CommentDelete;
import com.kjh.unchained.service.CommentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
public class CommentController {

    private final CommentService commentService;

    /**
     * 댓글 작성
     * @param postId
     * @param request
     */
    @PostMapping("/posts/{postId}/comments")
    public void write(@PathVariable Long postId, @RequestBody @Valid CommentCreate request) {

        commentService.write(postId,request);

    }

    /**
     * 댓글 삭제
     * @param commentId
     * @param request
     */
    @PostMapping("/comments/{commentId}/delete")
    public void delete(@PathVariable Long commentId,@RequestBody @Valid CommentDelete request) {

        commentService.delete(commentId, request);

    }
}
