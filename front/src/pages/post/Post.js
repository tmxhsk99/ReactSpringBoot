import {Route, Routes, useNavigate} from "react-router-dom";
import PostListPage from "./PostListPage";
import PostEditPage from "./PostEditPage";
import PostAddPage from "./PostAddPage";
import PostDetailPage from "./PostDetailPage";
import {handleOnPageChange, handleOnClickPrev, handleOnClickNext, handleOnClickSearch} from "../../handlers/post/PostEventHandlers";
import {useRecoilState} from "recoil";
import React from "react";
import {postsState} from "../../state/post/postsState";

export const PostDispatchContext = React.createContext();

const Post = () => {
    const [posts, setPosts] = useRecoilState(postsState);
    const navigate = useNavigate();
    const onPageChange = handleOnPageChange(navigate, posts, setPosts);
    const onClickPrev = handleOnClickPrev(navigate, posts, setPosts);
    const onClickNext = handleOnClickNext(navigate, posts, setPosts);
    const onClickPostSearch = handleOnClickSearch(navigate, posts, setPosts);

    return (
        <PostDispatchContext.Provider value={{onPageChange, onClickPrev, onClickNext, onClickPostSearch}}>
            <Routes>
                <Route path="/list" element={<PostListPage/>}/>
                <Route path="/edit/:id" element={<PostEditPage/>}/>
                <Route path="/add" element={<PostAddPage/>}/>
                <Route path="/detail/:id" element={<PostDetailPage/>}/>
            </Routes>
        </PostDispatchContext.Provider>
    );

}

export default Post;