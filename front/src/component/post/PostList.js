import "./PostList.css";
import Aside from "../common/Aside";
import PostHeader from "./PostHeader";
import PostItem from "./PostItem";
import React, {useEffect, useState} from "react";
import EmptyItem from "../common/EmptyItem";
import Pagination from "./Pagination";

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"},
]
const PostList = ({posts}) => {

    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);
    useEffect(() => {
        if (posts != null) {
            const compare = (a, b) => {
                if (sortType === "latest") {
                    return Number(b.createdTime) - Number(a.createdTime);
                } else {
                    return Number(a.createdTime) - Number(b.createdTime);
                }
            }
            const copyList = posts;
            copyList.sort(compare);
            setSortedData(copyList);
        }
    }, [posts, sortType]);
    const onChangeSortType = (e) => {
        setSortType(e.target.value);
    }

    if (posts === null || posts === undefined) {
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