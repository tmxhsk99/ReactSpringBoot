package com.kjh.unchained.service;

import com.kjh.unchained.domain.Comment;
import com.kjh.unchained.domain.Post;
import com.kjh.unchained.exception.CommentNotFound;
import com.kjh.unchained.exception.InvalidPassword;
import com.kjh.unchained.exception.PostNotFound;
import com.kjh.unchained.repository.jpa.comment.CommentRepository;
import com.kjh.unchained.repository.jpa.post.PostRepository;
import com.kjh.unchained.request.comment.CommentCreate;
import com.kjh.unchained.request.comment.CommentDelete;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final PostRepository postRepository;
    private final CommentRepository commentRepository;
    private final PasswordEncoder passwordEncoder;

    @Transactional
    public void write(Long postId, CommentCreate request) {
        Post post = postRepository.findById(postId)
                .orElseThrow(PostNotFound::new);

        String encryptPassword = passwordEncoder.encode(request.getPassword());

        Comment comment = Comment.builder()
                .author(request.getAuthor())
                .password(encryptPassword)
                .content(request.getContent())
                .build();

        post.addComment(comment);
    }

    public void delete(Long commentId, CommentDelete request) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(CommentNotFound::new);


        String encryptedPassword = comment.getPassword();

        if(!passwordEncoder.matches(request.getPassword(), encryptedPassword)) {
            throw new InvalidPassword();
        }


        commentRepository.delete(comment);
    }
}
