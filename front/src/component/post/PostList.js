import "./PostList.css";
import Aside from "../common/Aside";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import React, {useEffect} from "react";
import EmptyItem from "../common/EmptyItem";
import Pagination from "./Pagination";
import {useQuery} from "react-query";
import {postGetFetcher} from "../../query/post/postApiService";
import {useRecoilState} from "recoil";
import {pageInfoState} from "../../state/post/pageInfoState";
import {postListState} from "../../state/post/postListState";

const PostList = () => {
    const [usePageInfo, setUsePageInfo] = useRecoilState(pageInfoState);
    const [postList, setPostList] = useRecoilState(postListState);

    const response =
        useQuery(['POSTS', {page: usePageInfo.currentPage, size: usePageInfo.pageCountSize}]
            , () => postGetFetcher({page: usePageInfo.currentPage, size: usePageInfo.pageCountSize}));


    useEffect(() => {
        if (response.isSuccess) {
            if (usePageInfo.totalCount !== response.data.totalCount) {
                setUsePageInfo(
                    {
                        ...usePageInfo,
                        totalCount:
                        response.data.totalCount
                    }
                )
            }
            // postList를 상태값에 저장한다.
            setPostList(response.data.postList);
            localStorage.setItem("postList", JSON.stringify(response.data.postList));
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
                    <Pagination/>
                </section>
                <Aside/>
            </div>
        );
    } else if (response.isLoading) {
        return (
            <div className="PostList">
                <Aside/>
                <div className="list nes-container is-dark with-title">
                    <PostHeader title={"글 리스트"}/>
                    <EmptyItem/>
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