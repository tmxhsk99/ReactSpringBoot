import {ARTICLE_API_DOMAIN} from "../../util";
import useArticleAsync from "./hooks/usePostAsync";

const usePost = (page = 1, size = 10, deps = [], skip = false) => {
    async function getArticle(){
        return await fetch(`${ARTICLE_API_DOMAIN}/posts?page=${page}&size=${size}`)
            .then(res => {
                if(!res.ok){
                    throw new Error(`errorCode : ${res.status} \nerrorMsg : ${res.json()}`);
                }
                return res.json();
            })
            .then(json => console.log(json))
            .catch(error => console.log(error.message));
    }

    const [state, refetch] = useArticleAsync(getArticle, [],skip);

    return [state, refetch];
}

export default usePost;