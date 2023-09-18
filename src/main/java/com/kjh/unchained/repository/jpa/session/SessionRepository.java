package com.kjh.unchained.repository.jpa.session;

import com.kjh.unchained.domain.Session;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;


public interface SessionRepository extends CrudRepository<Session, Long> {

    Optional<Session> findByAccessToken(String accessToken);

}
