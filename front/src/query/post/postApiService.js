import {fetcher} from "../queryClient";

/**
 * 게시글 리스트 요청 유틸함수
 * @param pageParam
 * @param sizeParam
 * @returns {Promise<any>}
 */
export const postGetFetcher = ({
                                   page = 1,
                                   size = 10,
                                   title = "",
                                   content = "",
                                   nikName = "",
                               }) => fetcher({
    method: "GET",
    path: "/posts",
    params: {
        page: page,
        size: size,
        title: title,
        content: content,
        nikName: nikName,
    },
})

export const postFindByIdFetcher = ({id}) => fetcher({
    method: "GET",
    path: `/posts/${id}`,
})
