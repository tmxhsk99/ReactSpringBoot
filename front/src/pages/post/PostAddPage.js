import Header from "../../component/common/Header";
import {DEFAULT_MENU, SITE_NAME} from "../../util/constUtil";
import Footer from "../../component/common/Footer";
import PostWrite from "../../component/post/PostWrite";

const PostAddPage = () =>{
    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}/>
            <PostWrite/>
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>
    )
}

export default PostAddPage;