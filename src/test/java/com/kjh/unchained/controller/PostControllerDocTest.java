package com.kjh.unchained.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.config.UnchainedMockUser;
import com.kjh.unchained.domain.Post;
import com.kjh.unchained.repository.jpa.post.PostRepository;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.post.PostCreate;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.restdocs.RestDocumentationExtension;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.parameterWithName;
import static org.springframework.restdocs.request.RequestDocumentation.pathParameters;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureRestDocs(uriScheme = "https", uriHost = "api.unchained.com", uriPort = 443)
@ExtendWith(RestDocumentationExtension.class)
public class PostControllerDocTest {
    //참고 : https://docs.spring.io/spring-restdocs/docs/current/reference/html5/
    @Autowired
    private PostRepository postRepository;

    @Autowired
    MockMvc mockMvc;


    @Autowired
    ObjectMapper objectMapper;

    @Autowired
    UserRepository userRepository;

    @Test
    @AfterEach
    void clean() {
        postRepository.deleteAll();
        userRepository.deleteAll();
    }

    @Test
    @DisplayName("글 단건 조회 테스트")
    void RestDocsTest_post_read() throws Exception {
        //given
        Post post = Post.builder()
                .title("제목")
                .content("내용")
                .build();
        postRepository.save(post);

        //expected
        mockMvc.perform(get("/api/posts/{postId}", 1L)
                        .accept(APPLICATION_JSON))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("post-inquiry", pathParameters(
                                parameterWithName("postId").description("게시글 ID")
                        ),
                        responseFields(
                                fieldWithPath("id").description("게시글 ID"),
                                fieldWithPath("title").description("게시글 제목"),
                                fieldWithPath("content").description("게시글 내용"),
                                fieldWithPath("createdTime").description("게시글 생성일"),
                                fieldWithPath("updatedTime").description("게시글 수정일")
                        )
                ));
    }

    @Test
    @DisplayName("글 등록 테스트")
    @UnchainedMockUser
    void RestDocsTest_post_save() throws Exception {

        //given
        PostCreate request = PostCreate.builder()
                .title("글제목")
                .content("content")
                .build();

        String json = objectMapper.writeValueAsString(request);

        //expected
        mockMvc.perform(post("/api/posts")
                        .contentType(APPLICATION_JSON)
                        .accept(APPLICATION_JSON)
                        .content(json))
                .andDo(print())
                .andExpect(status().isOk())
                .andDo(document("post-create",
                        requestFields(
                                fieldWithPath("title").description("제목")
                                        .attributes(key("constraint").value("제목에 바보는 금지어 입니다.")),
                                fieldWithPath("content").description("내용").optional()
                        )
                ));
    }
}
