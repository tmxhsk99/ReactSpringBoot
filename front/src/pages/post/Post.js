import {Route, Routes, useNavigate} from "react-router-dom";
import PostListPage from "./PostListPage";
import PostEditPage from "./PostEditPage";
import PostAddPage from "./PostAddPage";
import PostDetailPage from "./PostDetailPage";
import {handleOnPageChange, handleOnClickPrev, handleOnClickNext} from "./PostEventHandlers";
import {useRecoilState} from "recoil";
import {pageInfoState} from "../../state/post/pageInfoState";

export const PostDispatchContext = React.createContext();

const Post = () => {
    const [usePageInfo,setUsePageInfo] = useRecoilState(pageInfoState);
    const navigate = useNavigate();
    const onPageChange = handleOnPageChange(navigate, usePageInfo, setUsePageInfo);
    const onClickPrev = handleOnClickPrev(navigate, usePageInfo, setUsePageInfo);
    const onClickNext = handleOnClickNext(navigate, usePageInfo, setUsePageInfo);

    return (
        <PostDispatchContext.Provider value={{onPageChange, onClickPrev, onClickNext}}>
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