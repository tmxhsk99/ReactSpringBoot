import "./PostList.css";
import Aside from "../common/Aside";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import React, {useEffect, useState} from "react";
import EmptyPostList from "../common/empty/EmptyPostList";
import Pagination from "./Pagination";
import {useQuery} from "react-query";
import {postGetFetcher} from "../../query/post/postApiService";
import {useRecoilState} from "recoil";
import {postsState} from "../../state/post/postsState";

async function updatePostLocalStorage(response) {
    await localStorage.setItem("posts", JSON.stringify({
        postList: [
            ...response.data.postList,
        ],
        pageInfo: {
            ...response.data.pageInfo,
        }
    }));
}

const PostList = () => {
    const [posts, setPosts] = useRecoilState(postsState);
    const response =
        useQuery(['POSTS', {page: posts.pageInfo.currentPage, size: posts.pageInfo.pageSize}]
            , () => postGetFetcher({page: posts.pageInfo.currentPage, size: posts.pageInfo.pageSize})
            , {/*캐시 설정 60초 이내에 다시 요청하면 캐시를 사용한다.*/
                cacheTime: 1000 * 60,
                staleTime: 1000 * 60,
            }
        );


    useEffect(() => {
        if (response.isSuccess) {
            // posts 를 상태값 및 localStorage 에 저장한다.
            setPosts(response.data);
            void updatePostLocalStorage(response);
        }

    }, [response.isSuccess]);

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