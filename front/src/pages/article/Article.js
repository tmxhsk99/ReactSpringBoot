import Header from "../../component/common/Header";
import Footer from "../../component/common/Footer";
import {SITE_NAME, DEFAULT_MENU} from "../../util";
import ArticleHeader from "../../component/article/ArticleHeader";
import {useEffect} from "react";
const fetchArticle = async (page,size,title,content) => {
    const API_DOMAIN = "http://localhost:8080";
    const response = await fetch(`${API_DOMAIN}/posts?page=${page}&size=${size}&title=${title}&content=${content}`);
    const responseJson = await response.json();
    return responseJson;
};

const Article = () => {
    useEffect(()=>{
        const posts = fetchArticle();
        console.log(posts);
    },[])
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