import Header from "../../component/common/Header";
import {DEFAULT_MENU, SITE_NAME} from "../../util/constUtil";
import Footer from "../../component/common/Footer";

const PostEditPage = () => {
    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}/>
            
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>

    )
}

export default PostEditPage;