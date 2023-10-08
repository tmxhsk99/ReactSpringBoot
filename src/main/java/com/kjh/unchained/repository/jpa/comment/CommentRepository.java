package com.kjh.unchained.repository.jpa.comment;

import com.kjh.unchained.domain.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {

}
