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

const PostList = () => {
    const [usePageInfo, setUsePageInfo] = useRecoilState(pageInfoState);
    const response =
        useQuery(['POSTS', {page: usePageInfo.currentPage, size: usePageInfo.pageCountSize}]
            , () => postGetFetcher({page: usePageInfo.currentPage, size: usePageInfo.pageCountSize}));

    console.log(response);

    useEffect(() => {
        if (response.isSuccess && usePageInfo.totalCount !== response.data.totalCount) {
            setUsePageInfo(
                {
                    ...usePageInfo,
                    totalCount:
                    response.data.totalCount
                }
            )
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