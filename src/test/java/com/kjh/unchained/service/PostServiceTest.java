package com.kjh.unchained.service;

import com.kjh.unchained.domain.Post;
import com.kjh.unchained.domain.User;
import com.kjh.unchained.exception.PostNotFound;
import com.kjh.unchained.repository.jpa.post.PostRepository;
import com.kjh.unchained.repository.jpa.user.UserRepository;
import com.kjh.unchained.request.post.PostCreate;
import com.kjh.unchained.request.post.PostEdit;
import com.kjh.unchained.request.post.PostSearch;
import com.kjh.unchained.response.PostListResponse;
import com.kjh.unchained.response.PostResponse;
import com.kjh.unchained.testutil.fixture.AuthFixture;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class PostServiceTest {
    @Autowired
    private PostService postService;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private UserRepository userRepository;


    @BeforeEach
    void setting() {

        postRepository.deleteAll();
        userRepository.deleteAll();

    }


    @Test
    @DisplayName("글 삭제 테스트 ")
    public void deletePosts() {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("content")
                .build();


        postRepository.save(post);

        //when
        postService.delete(post.getId());

        //then
        assertThat(postRepository.count()).isEqualTo(0);
    }

    @Test
    @DisplayName("글 삭제 실패 테스트 - PostNotFound()")
    void deletePosts_Exception() {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("gle")
                .build();
        postRepository.save(post);


        //expected
        PostNotFound e = Assertions.assertThrows(PostNotFound.class, () -> {
            postService.delete(post.getId() + 1L);
        });

        assertThat(e.getMessage()).isEqualTo("존재하지 않는 글입니다.");
    }

    @Test
    @DisplayName("글 내용 수정 테스트")
    void postEdit3() throws Exception {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("content")
                .build();


        postRepository.save(post);

        PostEdit postEditDto = PostEdit.builder()
                .title("kjh")
                .content("content2")
                .build();

        //when
        postService.edit(post.getId(), postEditDto);

        //then
        Post findPost = postRepository.findById(post.getId())
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다. id=" + post.getId()));
        assertThat(findPost.getContent()).isEqualTo("content2");

    }

    @Test
    @DisplayName("글 수정 테스트")
    void postEdit2() throws Exception {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("content")
                .build();


        postRepository.save(post);

        PostEdit postEditDto = PostEdit.builder()
                .title("수정 테스트 제목")
                .content("content2")
                .build();

        //when
        postService.edit(post.getId(), postEditDto);

        //then
        Post findPost = postRepository.findById(post.getId())
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다. id=" + post.getId()));
        assertThat(findPost.getTitle()).isEqualTo("수정 테스트 제목");
        assertThat(findPost.getContent()).isEqualTo("content2");

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

        PostEdit postEditDto = PostEdit.builder()
                .title("수정 테스트 제목")
                .build();

        //when
        postService.edit(post.getId(), postEditDto);

        //then
        Post findPost = postRepository.findById(post.getId())
                .orElseThrow(() -> new RuntimeException("글이 존재하지 않습니다. id=" + post.getId()));
        assertThat(findPost.getTitle()).isEqualTo("수정 테스트 제목");


    }

    @Test
    @DisplayName("글 여러개 조회")
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

        PostSearch postSearch = PostSearch.builder()
                .page(1)
                .build();

        //when
        PostListResponse posts = postService.getList(postSearch);

        //then
        assertThat(posts.getPostList().size()).isEqualTo(10L);
        assertThat(posts.getPostList().get(0).getTitle()).isEqualTo("kjh 제목19");


    }

    @Test
    @DisplayName("글 1개 조회")
    void read_one_post() {
        //given
        Post post = Post.builder()
                .title("123456789012345")
                .content("gle")
                .build();
        postRepository.save(post);

        //when
        PostResponse returnPost = postService.get(post.getId());

        //then
        assertThat(returnPost).isNotNull();
        assertThat(returnPost.getTitle()).isEqualTo("123456789012345");
        assertThat(returnPost.getContent()).isEqualTo("gle");
    }

    @Test
    @DisplayName("글 1개 조회 실패 테스트 - PostNotFound()")
    void read_one_post_Exception() {
        //given
        Post post = Post.builder()
                .title("kjh")
                .content("gle")
                .build();
        postRepository.save(post);


        //expected
        PostNotFound e = Assertions.assertThrows(PostNotFound.class, () -> {
            postService.get(post.getId() + 1L);
        });

        assertThat(e.getMessage()).isEqualTo("존재하지 않는 글입니다.");
    }

    @Test
    @DisplayName("PostService 글 작성 테스트")
    void post_save_test() {
        //given
        var user = User.builder()
                .name(AuthFixture.VALID_NAME)
                .email(AuthFixture.VALID_EMAIL)
                .password(AuthFixture.VALID_PASSWORD)
                .build();

        userRepository.save(user);


        PostCreate postCreate = PostCreate.builder()
                .title("제목입니다.")
                .content("내용입니다.")
                .build();

        //when
        postService.write(user.getId(), postCreate);

        //then
        assertThat(postRepository.count()).isEqualTo(1L);
        assertThat(postCreate.getTitle()).isEqualTo("제목입니다.");
        assertThat(postCreate.getContent()).isEqualTo("내용입니다.");

    }

}
