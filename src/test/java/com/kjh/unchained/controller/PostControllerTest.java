package com.kjh.unchained.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kjh.unchained.domain.Post;
import com.kjh.unchained.repository.jpa.post.PostRepository;
import com.kjh.unchained.request.post.PostCreate;
import com.kjh.unchained.request.post.PostEdit;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.is;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@AutoConfigureMockMvc
@SpringBootTest
class PostControllerTest {
    @Autowired
    MockMvc mockMvc;

    @Autowired
    PostRepository postRepository;

    @Autowired
    ObjectMapper objectMapper;


    @BeforeEach
    void clean() {
        postRepository.deleteAll();
    }


    @Test
    @DisplayName("글 작성시 제목에 '바보'는 포함 될 수 없다. ")
    public void ExceptionTest() throws Exception {
        //given
        PostCreate request = PostCreate.builder()
                .title("kjh 바보")
                .content("content")
                .build();

        String json = objectMapper.writeValueAsString(request);

        //when
        mockMvc.perform(post("/api/posts")
                        .contentType(APPLICATION_JSON)
                        .content(json))
                .andExpect(status().isBadRequest())
                .andDo(print());

    }

    @Test
    @DisplayName("글 삭제 테스트")
    void postDelete() throws Exception {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("content")
                .build();

        postRepository.save(post);

        /**
         * expected
         */
        mockMvc.perform(delete("/api/posts/{postId}", post.getId()) // PATCH /post/{postId}
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andDo(print());
    }

    @Test
    @DisplayName("글 제목 수정")
    void postEdit() throws Exception {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("content")
                .build();

        postRepository.save(post);


        PostEdit postEdit = PostEdit.builder()
                .title("김주현")
                .content("content")
                .build();

        /**
         * expected
         */
        mockMvc.perform(patch("/api/posts/{postId}", post.getId()) // PATCH /post/{postId}
                        .contentType(APPLICATION_JSON).content(objectMapper.writeValueAsString(postEdit)))
                .andExpect(status().isOk())
                .andDo(print());


    }

    @Test
    @DisplayName("페이지를 0으로 요청하면 첫 페이지를 가져온다.")
    void get_postList() throws Exception {
        //given
        List<Post> requestPosts = IntStream.range(0, 20)
                .mapToObj(i -> {
                    return Post.builder()
                            .title("kjh 제목" + i)
                            .content("content" + i)
                            .build();
                })
                .collect(Collectors.toList());

        postRepository.saveAll(requestPosts);

        /**
         * expected
         */
        //mockMvc.perform(get("/posts?page=1&sort=id,desc&size=5") //pagable 생성시 , 파라미터로 size를 넘길수도 있지만 application.yml에 기본설정을 지성할 수 도 있다.
        mockMvc.perform(get("/api/posts?page=0&size=10")
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.postList.length()", is(10)))
                .andExpect(jsonPath("$.postList.[0].title", is("kjh 제목19")))
                .andExpect(jsonPath("$.postList.[0].content", is("content19")))
                .andDo(print());

    }


    @Test
    @DisplayName("글 1개 조회")
    void get_post() throws Exception {
        //given
        Post post = Post.builder()
                .title("goo")
                .content("gle")
                .build();
        postRepository.save(post);

        //expected [when + then]
        mockMvc.perform(get("/api/posts/{postId}", post.getId())
                        .contentType(APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(post.getId()))
                .andExpect(jsonPath("$.title").value("goo"))
                .andExpect(jsonPath("$.content").value("gle"))
                .andDo(print());


    }

    @Test
    @WithMockUser(username = "admin@unchained.com",
            roles = {"ADMIN"},
            password = "1234"
    )
    @DisplayName("요청자 권한이 ADMIN인 경우 글작성 요청 시 글이 저장된다.")
    void sendJson_db_save() throws Exception {
        //given
        PostCreate request = PostCreate
                .builder()
                .title("제목입니다.")
                .content("내용입니다.")
                .build();

        String jsonString = objectMapper.writeValueAsString(request);

        // when
        mockMvc.perform(post("/api/posts")
                        .contentType(APPLICATION_JSON)
                        .content(jsonString)
                )
                .andExpect(status().isOk())
                .andDo(print());

        // then
        assertThat(postRepository.count()).isEqualTo(1L);


        Post post = postRepository.findAll().get(0);
        assertThat(post.getTitle()).isEqualTo("제목입니다.");
        assertThat(post.getContent()).isEqualTo("내용입니다.");
    }


    @Test
    @DisplayName("/posts 요청시 ControllerAdvice. 에러 확인 테스트")
    void sendJson_use_controller_advice() throws Exception {

        PostCreate request = PostCreate
                .builder()
                .content("내용입니다.")
                .build();

        String jsonString = objectMapper.writeValueAsString(request);

        //제목을 제거한다.
        mockMvc.perform(post("/api/posts")
                        .contentType(APPLICATION_JSON)
                        .content(jsonString)
                )
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.code").value("400"))
                .andExpect(jsonPath("$.message").value("잘못된 요청입니다."))
                .andExpect(jsonPath("$.validation.title").value("타이틀을 입력해주세요."))
                .andDo(print());
    }

}
