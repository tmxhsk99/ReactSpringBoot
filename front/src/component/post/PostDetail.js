import React, {useEffect, useState} from "react";
import TitleContainer from "../common/TitleContainer";
import WriterInfoContainer from "./WriterInfoContainer";
import {useRecoilState} from "recoil";
import {postListState} from "../../state/post/postListState";
import "./PostDetail.css";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import Pagination from "./Pagination";

const PostDetail = ({postId}) => {
    const [posts, setPosts] = useRecoilState(postListState);
    const [findPost, setFindPost] = useState(null);

    useEffect(() => {
        const rawPostsData = localStorage.getItem("postList");
        if (rawPostsData != null) {
            setPosts(JSON.parse(rawPostsData));
        }
        const postsJson = JSON.parse(rawPostsData);

        setPosts(postsJson);
        if (postsJson.length != undefined && postsJson.length != 0) {
            const findPost = postsJson.find((post) => post.id === Number(postId));
            setFindPost(findPost);
        }
    }, [postId]);

    if (findPost != null) {
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
                    <PostHeader title={"글 리스트"}/>
                    <div className="boardList">
                        {posts.map((it) =>
                            <PostItem key={it.id} {...it}/>
                        )}
                    </div>
                    <Pagination/>
                </section>
            </div>

        );
    }
}

export default PostDetail;