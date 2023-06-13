import {POST_API_DOMAIN} from "../../../util";
import usePostAsync from "./usePostAsync";

const useGetPost = (page = 1, size = 10, deps = [], skip = false) => {
    async function getPost(){
        const resPostData = await fetch(`${POST_API_DOMAIN}/posts?page=${page}&size=${size}`)
            .then(res => {
                if(!res.ok){
                    throw new Error(`errorCode : ${res.status} \nerrorMsg : ${res.json()}`);
                }
                return res.json();
            })
            .catch(error => console.log(error.message));
        console.log(resPostData);
        return resPostData;
    }
    return usePostAsync(getPost, [], skip)
}

export default useGetPost;