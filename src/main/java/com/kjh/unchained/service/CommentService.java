package com.kjh.unchained.service;

import com.kjh.unchained.domain.Comment;
import com.kjh.unchained.domain.Post;
import com.kjh.unchained.exception.PostNotFound;
import com.kjh.unchained.repository.jpa.comment.CommentRepository;
import com.kjh.unchained.repository.jpa.post.PostRepository;
import com.kjh.unchained.request.comment.CommentCreate;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;

    @Transactional
    public void write(Long postId, CommentCreate request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(PostNotFound::new);

        Comment comment = Comment.builder()
                .author(request.getAuthor())
                .content(request.getContent())
                .password(request.getPassword())
                .build();

        post.addComment(comment);
    }
}
