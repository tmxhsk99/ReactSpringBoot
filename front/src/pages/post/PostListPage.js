import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {SITE_NAME, DEFAULT_MENU} from "../../util";
import PostList from "../../component/post/PostList";
import useGetPost from "../../component/hooks/post/useGetPost";
import Loading from "../../component/common/Loading";

const PostListPage = () => {

    const [state, refetch] = useGetPost(1, 10);
    const {loading, data, error} = state;
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
            <>
                <Header
                    title={SITE_NAME}
                    menus={DEFAULT_MENU}/>
                <PostList posts={data}/>
                <Footer
                    title={SITE_NAME}
                    menus={DEFAULT_MENU}
                />
            </>

        )
    }

}

export default PostListPage;