package com.kjh.unchained.springconfig.web;

import com.kjh.unchained.domain.Session;
import com.kjh.unchained.exception.UnAuthorized;
import com.kjh.unchained.repository.jpa.session.SessionRepository;
import com.kjh.unchained.springconfig.web.data.UserSession;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

@RequiredArgsConstructor
public class AuthResolver implements HandlerMethodArgumentResolver {

    @Value("${jwt.secret}")
    private String KEY;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(UserSession.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest servletRequest = webRequest.getNativeRequest(HttpServletRequest.class);

        if(servletRequest == null) {
            throw new UnAuthorized("HttpServletRequest가 존재하지 않습니다.");
        }
        Cookie[] cookies = servletRequest.getCookies();

        if(cookies == null || cookies.length == 0) {
            throw new UnAuthorized("쿠키가 존재하지 않습니다.");
        }

        Cookie sessionCookie = null;
        for (Cookie cookie : cookies) {
            if ("SESSION".equals(cookie.getName())){
                sessionCookie = cookie;
            }
        }
        String jws = sessionCookie.getValue();

        if (!StringUtils.hasText(jws)) {
            throw new UnAuthorized("accessToken이 존재하지 않습니다.");
        }

        byte[] decodeKey = Base64.decodeBase64(KEY);
        try {
            Jws<Claims> claimsJws = Jwts.parserBuilder()
                    .setSigningKey(decodeKey)
                    .build()
                    .parseClaimsJws(jws);

            String userId = claimsJws.getBody().getSubject();
            // UserSession
            return new UserSession(Long.getLong(userId));
        } catch (Exception e) {
            throw new UnAuthorized("accessToken이 유효하지 않습니다.");
        }
    }
}
