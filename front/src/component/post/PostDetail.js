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
import {postFindByIdFetcher} from "../../query/post/postApiService";

const PostDetail = ({postId}) => {
    const [posts, setPosts] = useRecoilState(postsState);
    const [findPost, setFindPost] = useState('loading');


    const response =
        useQuery(['POSTS', {id: postId}]
            , () => postFindByIdFetcher({id: postId}));

    useEffect(() => {
        const findDetail = posts.postList.find((post) => post.id === Number(postId));
        if(findDetail){
            setFindPost(findDetail);
        } else {
            const rawPostsData = localStorage.getItem("posts");
            if (rawPostsData != null) {
                setPosts(JSON.parse(rawPostsData));
            }
        }
        if(findPost === 'loading' && response.isSuccess){
            setFindPost(response.data);
        }
        console.log(response);
        console.log(Number(postId) + 1 )
        console.log(posts);
        console.log(posts.pageInfo.totalCount);
        console.log(Number(postId) + 1 > posts.pageInfo.totalCount)
    }, [postId, response.isSuccess]);

    if(findPost === 'loading'){
        return (
            <div className="PostDetail">
                <Aside/>
                <Loading></Loading>
                <Aside/>
            </div>
        );
    }else if (findPost != null) {
        return (
            <div className="PostDetail">
                <section className="detail nes-container">
                    <TitleContainer title={findPost.title}/>
                    <WriterInfoContainer
                        userImageUrl={findPost.userImageUrl}
                        nickName={findPost.nickName}
                        viewCount={findPost.viewCount}
                        likeCount={findPost.likeCount}
                        createdTime={findPost.createdTime}
                        writer={findPost.writer}
                    />
                    <div className="content nes-container">{findPost.content}</div>
                    <HorizonButtonList
                        leftChild={
                            Number(postId) + 1 < posts.pageInfo.totalCount ?
                                <BasicNesBtn link={`/post/detail/${Number(postId) + 1}`} title="< 이전 글"/> : ""
                        }
                        centerChild={<BasicNesBtn link={`/post/list`} title="목록"/>}
                        rightChild={
                            Number(postId) - 1 > 1 ?
                            <BasicNesBtn link={`/post/detail/${Number(postId) - 1}`} title="다음 글 >"/> : ""
                        }
                    />
                    <PostHeader title={"글 리스트"}/>
                    <div className="boardList">
                        {posts.postList.map((it) =>
                            <PostItem key={it.id} {...it}/>
                        )}
                    </div>
                    <Pagination totalCount={posts.pageInfo.totalCount} currentPage={posts.pageInfo.currentPage}
                                pageSize={posts.pageInfo.pageSize}/>
                </section>
            </div>

        );
    }else{
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