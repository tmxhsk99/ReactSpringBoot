import "./PostList.css";
import Aside from "../common/Aside";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import React, {useContext, useEffect, useState} from "react";
import EmptyItem from "../common/EmptyItem";
import Pagination from "./Pagination";
import {PostStateContext} from "../../pages/post/Post";
const PostList = () => {

    const posts = useContext(PostStateContext);

    if (posts === null || posts === undefined || posts.length === 0) {
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
    } else {
        return (
            <div className="PostList">
                <Aside/>
                <section className="list nes-container">
                    <PostHeader title={"글 리스트"}/>
                    <div className="boardList">
                        {posts.map((it) =>
                            <PostItem key={it.id} {...it}/>
                        )}
                    </div>
                    <Pagination></Pagination>
                </section>
                <Aside/>
            </div>
        );
    }

}

export default PostList;