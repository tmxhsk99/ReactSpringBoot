package com.kjh.unchained.repository.jpa;

import com.kjh.unchained.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post,Long>,PostRepositoryCustom {

}
