import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {SITE_NAME, DEFAULT_MENU} from "../../util/util";
import PostList from "../../component/post/PostList";
import useGetPost from "../../component/hooks/post/useGetPost";
import Loading from "../../component/common/Loading";
import {PostStateContext} from "./Post";
import {useContext} from "react";

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