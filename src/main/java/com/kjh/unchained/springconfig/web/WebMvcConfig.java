package com.kjh.unchained.springconfig.web;

import com.kjh.unchained.springconfig.app.JwtAppConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class WebMvcConfig implements WebMvcConfigurer {
    private final JwtAppConfig jwtAppConfig;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                //.allowedOrigins("http://juheyon.com", "https://juheyon.com")
                .allowedMethods("GET", "POST", "PATCH", "DELETE")
                .allowedHeaders("*")
                .allowCredentials(true);
    }

}
