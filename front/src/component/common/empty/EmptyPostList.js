import "./EmptyPostList.css";
import Pagination from "../../post/Pagination";
import PostHeader from "../../post/PostHeader";
import PostItem from "../../post/PostItem";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {postsState} from "../../../state/post/postsState";

const EmptyPostList = ({title}) => {
    const posts = useRecoilValue(postsState);
    return (
        <div className="EmptyPostList">
            <section className="list">
                <PostHeader title={title}/>
                <div className="loader"></div>
                <div className="boardList">
                    {posts.postList.map((it) =>
                        <PostItem key={it.id} {...it}/>
                    )}
                </div>
                <Pagination totalCount={posts.pageInfo.totalCount}
                            currentPage={posts.pageInfo.currentPage}
                            pageSize={posts.pageInfo.pageSize}/>
            </section>
        </div>
    )
}

export default EmptyPostList;