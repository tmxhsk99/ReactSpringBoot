import React, {useEffect, useState} from "react";
import TitleContainer from "../common/TitleContainer";
import WriterInfoContainer from "./WriterInfoContainer";
import {useRecoilState} from "recoil";
import {postsState} from "../../state/post/postsState";
import "./PostDetail.css";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import Pagination from "./Pagination";
import HorizonButtonList from "../common/HorizonButtonList";
import BasicNesBtn from "../common/button/BasicNesBtn";
import Loading from "../common/Loading";
import Aside from "../common/Aside";
import {useQuery} from "react-query";
import {postFindByIdFetcher, postGetFetcher} from "../../query/post/postApiService";
import {QueryKeys} from "../../query/queryClient";
import {updatePostsState} from "../../handlers/post/PostEventHandlers";
import {useNavigate} from "react-router-dom";


const PostDetail = ({postId}) => {
    const [posts, setPosts] = useRecoilState(postsState);
    const [findPost, setFindPost] = useState('loading');
    const [lastPressButton, setLastPressButton] = useState("none");
    const navigate = useNavigate();
    const [currentPage,setCurrentPage] = useState(0);
    const response = useQuery([QueryKeys.POSTS, {id: postId}]
        , () => postFindByIdFetcher({id: postId}), {
                        cacheTime: 0,
                        staleTime: 0,
                    });

    // 최초 로드시 게시글 상세를 가져온다.
    useEffect(() => {
        const findDetail = posts.postList.find((post) => post.id === Number(postId));
        if (findDetail) {
            setFindPost(findDetail);
        } else {
            const rawPostsData = localStorage.getItem("posts");
            if (rawPostsData != null) {
                setPosts(JSON.parse(rawPostsData));
            }
        }
        if (findPost === 'loading' && response.isSuccess) {
            setFindPost(response.data);
        }

    }, [postId, response.isSuccess]);

    // 상세게시글이 변경될 경우 상세 게시글을 다시 호출하여 가져온다.
    useEffect(() => {
        if (findPost) {
            void response.refetch({
                id: findPost.id
            });
        }
    }, [findPost])

    // 현재 게시글 리스트
    useEffect(() => {
        // 게시글 상세에서 다음을 누를 경우 새로 리스트를 API를 호출하여 리스트를업데이트한 후
        // 처음값을 넣어준다...
        if (findPost !== "loading" && findPost !== undefined && lastPressButton !== "none") {
            if (lastPressButton === "next") {
                setFindPost(posts.postList[0]);
            }
            if (lastPressButton === "before") {
                setFindPost(posts.postList[posts.postList.length - 1]);
            }
        }
        setCurrentPage(Number(posts.pageInfo.currentPage));
    }, [posts]);

    useEffect(() => {
        if(Number(currentPage) !== 0 && Number(currentPage) !== Number(posts.pageInfo.currentPage)) {
            navigate(`/post/list?page=${posts.pageInfo.currentPage}&size=${posts.pageInfo.pageSize}`);
        }
    }, [posts.pageInfo]);

    // 현재 글리스트 상태에 없는 경우 다시 API를 호출하여 리스트를 가져온다.
    const fetchPosts = async (changedPage) => {
        const resPostData = await postGetFetcher({
            page: changedPage,
            size: posts.pageInfo.pageSize,
            title: posts.searchCondition.title,
            content: posts.searchCondition.content,
            nickName: posts.searchCondition.nickName,
        });
        await void updatePostsState(setPosts, resPostData, resPostData.pageInfo.currentPage, resPostData.pageInfo.pageSize, posts.searchCondition);
    }

    // 다음 글 버튼 클릭시 이벤트
    const onClickNextPost = async (postId) => {
        let nextPost;
        setLastPressButton("next");
        //현재 페이지의 마지막 게시글일 경우 다음 게시글 리스튼를 호출하여 다음 게시글을 가져온다.
        if (postId === posts.postList[posts.postList.length - 1].id) {
            await void fetchPosts(posts.pageInfo.currentPage + 1);
            return;
        }

        posts.postList.forEach((post, idx) => {
            if (post.id === Number(postId) && idx < posts.postList.length - 1) {
                nextPost = posts.postList[idx + 1];
            }
        });
        await setFindPost(nextPost);

    }

    // 이전 글 버튼 클릭시 이벤트
    const onClickBeforePost = async (postId) => {
        let beforePost;
        setLastPressButton("before");
        //현재 페이지의 첫번째 게시글일 경우 다음 게시글 리스튼를 호출하여 다음 게시글을 가져온다.
        if (postId === posts.postList[0].id && posts.pageInfo.currentPage > 1) {
            await void fetchPosts(posts.pageInfo.currentPage - 1);
            return;
        }
        posts.postList.forEach((post, idx) => {
            if (Number(post.id) === Number(postId) && idx > 0) {
                beforePost = posts.postList[idx - 1];
            }
        })
        await setFindPost(beforePost);
    }

    // 마지막 게시글인지 확인한다.
    const checkLastPost = () => {
        const {totalCount, currentPage, pageSize} = posts.pageInfo;
        const lastPage = Math.ceil(totalCount / pageSize);
        if (currentPage === lastPage) {
            return findPost.id === posts.postList[posts.postList.length - 1].id;
        }
        return false;
    }

    // 첫번째 게시물인지 확인한다.
    const checkFirstPost = () => {
        const {totalCount, currentPage, pageSize} = posts.pageInfo;
        if (currentPage === 1) {
            return findPost.id === posts.postList[0].id;
        }
        return false;
    }

    if (findPost === "loading") {
        return (
            <div className="PostDetail">
                <Aside/>
                <Loading></Loading>
                <Aside/>
            </div>
        );
    } else if (findPost != null && posts) {
        return (
            <div className="PostDetail">
                <section className="detail nes-container">
                    <TitleContainer title={findPost.title}/>
                    <WriterInfoContainer
                        findPost={findPost}
                    />
                    <div className="content nes-container">{findPost.content}</div>
                    <HorizonButtonList
                        leftChild={
                            checkFirstPost() ? "" :
                                <BasicNesBtn onClick={() => onClickBeforePost(findPost.id)} title="< 이전 글"/>
                        }
                        centerChild={<BasicNesBtn link={`/post/list`} title="목록"/>}
                        rightChild={
                            checkLastPost() ? "" :
                                <BasicNesBtn onClick={() => onClickNextPost(findPost.id)} title="다음 글 >"/>
                        }
                    />
                    <PostHeader title={"글 리스트"}/>
                    <div className="boardList">
                        {posts.postList.map((it) =>
                            <PostItem key={it.id}
                                      {...it}
                                isSelected={it.id === findPost.id}
                            />
                        )}
                    </div>
                    <Pagination totalCount={posts.pageInfo.totalCount} currentPage={posts.pageInfo.currentPage}
                                pageSize={posts.pageInfo.pageSize}/>
                </section>
            </div>

        );
    } else {
        return (
            <div className="PostDetail">
                <section className="detail nes-container">
                    <TitleContainer title={"글이 존재하지 않습니다."}/>
                </section>
            </div>
        );
    }
}

export default PostDetail;