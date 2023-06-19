import Header from "../../component/common/Header";
import {DEFAULT_MENU, SITE_NAME} from "../../util/util";
import PostList from "../../component/post/PostList";
import Footer from "../../component/common/Footer";
import PostDetail from "../../component/post/PostDetail";
import {useParams} from "react-router-dom";

const PostDetailPage = () =>{
    const params = useParams();
    const {id} = params;
    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}/>
            <PostDetail
                postId={id}
            />
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>
    )
}

export default PostDetailPage;