import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {SITE_NAME, DEFAULT_MENU} from "../../util/constUtil";
import PostList from "../../component/post/PostList";

const PostListPage = () => {
    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}/>
            <PostList/>
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>

    )
}

export default PostListPage;