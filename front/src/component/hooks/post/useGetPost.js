import {POST_API_DOMAIN} from "../../../util/util";
import usePostAsync from "./usePostAsync";
import {useCallback} from "react";

function useGetPost(page = 1, size = 10, deps = [], skip = false) {
    const getPost = useCallback(async () => {
        const resPostData = await fetch(`${POST_API_DOMAIN}/posts?page=${page}&size=${size}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`errorCode : ${res.status} \nerrorMsg : ${res.json()}`);
                }
                return res.json();
            })
            .catch((e) => {
                console.error(e);
                return null;
            });
        console.log(resPostData);
        return resPostData;
    })
    return usePostAsync(getPost, deps, skip);
}

export default useGetPost;