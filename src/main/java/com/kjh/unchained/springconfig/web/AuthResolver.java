package com.kjh.unchained.springconfig.web;

import com.kjh.unchained.domain.Session;
import com.kjh.unchained.exception.UnAuthorized;
import com.kjh.unchained.repository.jpa.session.SessionRepository;
import com.kjh.unchained.springconfig.web.data.UserSession;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

@RequiredArgsConstructor
public class AuthResolver implements HandlerMethodArgumentResolver {

    private final SessionRepository sessionRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(UserSession.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        String accessToken = webRequest.getHeader("Authorization");
        if (!StringUtils.hasText(accessToken)) {
            throw new UnAuthorized();
        }

        // 데이터 베이스 사용자 확인 작업
        Session session = sessionRepository.findByAccessToken(accessToken)
                .orElseThrow(UnAuthorized::new);


        // UserSession
        return new UserSession(session.getUser().getId());
    }
}
