import "./PostList.css";
import Aside from "../common/Aside";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import React, {useContext, useEffect, useState} from "react";
import EmptyPostList from "../common/empty/EmptyPostList";
import Pagination from "./Pagination";
import {useQuery} from "react-query";
import {postGetFetcher} from "../../query/post/postApiService";
import {useRecoilState} from "recoil";
import {postsState} from "../../state/post/postsState";
import SearchAndWrite from "../common/SearchAndWrite";
import Search from "../common/Search";
import {DEFAULT_POST_SEARCH_TYPE} from "../../util/constUtil";
import {QueryKeys} from "../../query/queryClient";
import {PostDispatchContext} from "../../pages/post/Post";
import BasicNesBtn from "../common/button/BasicNesBtn";
import {updatePostsState} from "../../handlers/post/PostEventHandlers";

async function updatePostLocalStorage(response, posts) {

    await localStorage.setItem("posts", JSON.stringify({
        postList: [
            ...response.data.postList,
        ],
        pageInfo: {
            ...response.data.pageInfo,
        },
        searchCondition: {
            ...posts.searchCondition,
        }
    }));
}

const PostList = () => {
    const [posts, setPosts] = useRecoilState(postsState);

    const response =
        useQuery([QueryKeys.POSTS,
                {
                    page: posts.pageInfo.currentPage,
                    size: posts.pageInfo.pageSize,
                    title: posts.searchCondition.title,
                    content: posts.searchCondition.content,
                    nickName: posts.searchCondition.nickName
                }
            ]
            , () => postGetFetcher(
                {
                    page: posts.pageInfo.currentPage,
                    size: posts.pageInfo.pageSize,
                    title: posts.searchCondition.title,
                    content: posts.searchCondition.content,
                    nickName: posts.searchCondition.nickName
                })
            , {
                cacheTime: 0,
                staleTime: 0,
            }
        );

    const {onClickPostSearch} = useContext(PostDispatchContext);

    useEffect(() => {
        if (response.isSuccess) {
            void updatePostLocalStorage(response, posts);
            void updatePostsState(setPosts, response.data, response.data.pageInfo.currentPage, response.data.pageInfo.pageSize, posts.searchCondition)
        }
    }, [response.isSuccess]);

    useEffect(() => {
        void response.refetch();
    }, [posts.pageInfo,posts.searchCondition]);


    if (response.isSuccess) {
        return (
            <div className="PostList">
                <Aside/>
                <section className="list nes-container">
                    <PostHeader title={"글 리스트"}/>
                    <div className="boardList">
                        {response.data.postList.map((it) =>
                            <PostItem key={it.id} {...it}/>
                        )}
                    </div>
                    <Pagination totalCount={response.data.pageInfo.totalCount}
                                currentPage={response.data.pageInfo.currentPage}
                                pageSize={response.data.pageInfo.pageSize}/>
                    <SearchAndWrite
                        centerChildren={
                            <Search
                                searchType={DEFAULT_POST_SEARCH_TYPE}
                                searchEvent={onClickPostSearch}
                                navigate={"/post/list"}
                            />
                        }
                        rightChildren={
                            <BasicNesBtn
                                title={"글쓰기"}
                                link={"/post/add"}
                            />
                        }
                    />
                </section>
                <Aside/>
            </div>
        );
    } else if (response.isLoading) {
        return (
            <div className="PostList">
                <Aside/>
                <div className="list nes-container ">
                    <EmptyPostList title={"글 리스트"}/>
                </div>
                <Aside/>
            </div>
        )
    } else if (response.isError) {
        return (
            <div>에러 발생!</div>
        )
    }

}

export default PostList;