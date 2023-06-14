import {Route, Routes} from "react-router-dom";
import PostListPage from "./PostListPage";
import PostEditPage from "./PostEditPage";
import PostAddPage from "./PostAddPage";
import PostDetailPage from "./PostDetailPage";
import React, {useEffect, useReducer, useState} from "react";
import {postReducer} from "./PostReducer";
import useGetPost from "../../component/hooks/post/useGetPost";
import {sortTypeUtil} from "../../util/sortUtil";
import Loading from "../../component/common/Loading";
import {handleOnPageChange, handleOnClickPrev, handleOnClickNext} from "./PostEventHandlers";
import Header from "../../component/common/Header";
import {DEFAULT_MENU, SITE_NAME} from "../../util/util";
import Footer from "../../component/common/Footer";

export const PostStateContext = React.createContext();
export const PostDispatchContext = React.createContext();

const Post = () => {

    const [sortType, setSortType] = useState("ID_DESC")
    const [state, fetchData] = useGetPost(1, 10);
    const {loading, data, error} = state;

    let [postData, postDispatch] = useReducer(postReducer, []);

    const onPageChange = handleOnPageChange(postDispatch);
    const onClickPrev = handleOnClickPrev(postDispatch);
    const onClickNext = handleOnClickNext(postDispatch);


    useEffect(() => {
        if (!loading && data && !error) {
            postDispatch({
                type: "INIT",
                data: data
            });
        }
    }, [loading,data,error]);

    if (loading) {
        return (
            <>
                <Header
                    title={SITE_NAME}
                    menus={DEFAULT_MENU}/>
                <Loading/>
                <Footer
                    title={SITE_NAME}
                    menus={DEFAULT_MENU}
                />
            </>
        )
    } else {
        return (
            <PostStateContext.Provider value={postData}>
                <PostDispatchContext.Provider value={{onPageChange, onClickPrev, onClickNext}}>
                    <Routes>
                        <Route path="/list" element={<PostListPage/>}/>
                        <Route path="/edit/:id" element={<PostEditPage/>}/>
                        <Route path="/add" element={<PostAddPage/>}/>
                        <Route path="/detail/:id" element={<PostDetailPage/>}/>
                    </Routes>
                </PostDispatchContext.Provider>
            </PostStateContext.Provider>
        );
    }

}

export default Post;