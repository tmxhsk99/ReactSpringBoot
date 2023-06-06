import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {SITE_NAME, DEFAULT_MENU,ARTICLE_API_DOMAIN} from "../../util";
import ArticleHeader from "../../component/article/ArticleHeader";
import useArticle from "../../component/hooks/useArticle";
import {useEffect} from "react";

const Article = () => {
    const [state, refetch] = useArticle(1, 10);
    const {loading, data, error} = state;
    console.log("loading : " + loading);
    console.log("data : " + data);
    console.dir(data);
    console.log("error :" + error);

    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}/>
            <div className="inner">
                <div className="nes-container is-dark with-title">
                    <ArticleHeader
                        title={"전체 글"}
                    />
                </div>
            </div>
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>

    )
}

export default Article;