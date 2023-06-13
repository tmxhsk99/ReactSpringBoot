import {Route, Routes} from "react-router-dom";
import PostListPage from "./PostListPage";
import PostEditPage from "./PostEditPage";
import PostAddPage from "./PostAddPage";
import PostDetailPage from "./PostDetailPage";


const Post = () => {
    return (
        <Routes>
            <Route path="/list" element={<PostListPage/>}/>
            <Route path="/edit/:id" element={<PostEditPage/>}/>
            <Route path="/add" element={<PostAddPage/>}/>
            <Route path="/detail/:id" element={<PostDetailPage/>}/>
        </Routes>
    )
}

export default Post;