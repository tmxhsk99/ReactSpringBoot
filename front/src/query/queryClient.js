import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import {POST_API_DOMAIN} from "../util/constUtil";

export const getQueryClient = (() => {
    let client = null;
    return () => {
        if (!client) client = new QueryClient(
            {
                defaultOptions: {
                    queries: {
                        cacheTime: 1000 * 60 * 60 * 6,
                        staleTime: 1000 * 60 * 60,
                        refetchOnMount: false,
                        refetchOnReconnect: false,
                        refetchOnWindowFocus: false,
                    }
                }
            }
        );
        return client;
    }
})();

export const fetcher = async ({method, path, body, params}) => {
    //posts?page=${page}&size=${size}
    let url = `${POST_API_DOMAIN}`;
    let RequestInit;
    const fetchOptions = RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': POST_API_DOMAIN,
        }
    }
    if (path) {
        url += path;
    }
    if (params) {
        const searchParams = new URLSearchParams(params);
        url += '?' + searchParams.toString();
    }
    if (body) {
        fetchOptions.body = JSON.stringify(body);
    }
    const resPostData = await fetch(url, fetchOptions)
        .then(res => {
            if (!res.ok) {
                throw new Error(`errorCode : ${res.status} \nerrorMsg : ${res.json()}`);
            }
            // 응답값 여부를 확인한다.
           const contentType = res.headers.get('content-type');
           if (contentType && contentType.indexOf('application/json') !== -1) {
             return res.json();
           }
           return {content:"response body is empty"};
        })
        .catch((e) => {
            console.error(e);
            return null;
        });
    return resPostData;
}

export const QueryKeys = {
    POSTS: 'POSTS',
}