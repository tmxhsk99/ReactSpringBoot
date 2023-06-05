import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {SITE_NAME,DEFAULT_MENU} from "../../util";

const Article = () => {

    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}/>
            <div>Article List 페이지</div>
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>

    )
}

export default Article;