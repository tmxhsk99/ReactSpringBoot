import "./PostEdit.css";
import Aside from "../common/Aside";
import TitleContainer from "../common/TitleContainer";
import Article from "./Article";
import {useParams} from "react-router-dom";
import {postsState} from "../../state/post/postsState";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";

const PostEdit = () => {
    const {id} = useParams();
    const posts = useRecoilValue(postsState);
    const [findPost, setFindPost] = useState('loading');

    useEffect(() => {
        if (posts) {
            const findPost = posts.postList.find((post) => post.id === Number(id));
            setFindPost(findPost);
        }
    }, [id, posts]);

    return (
        <div className="PostEdit">
            <Aside/>
            <section className="edit nes-container">
                <TitleContainer title={"글 수정"}></TitleContainer>
                <Article
                    post={findPost}
                    type={"edit"}
                />
            </section>
            <Aside/>
        </div>
    );
}

export default PostEdit;