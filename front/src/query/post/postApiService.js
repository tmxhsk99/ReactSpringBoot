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
    path: "/api/posts",
    params: {
        page: page,
        size: size,
        title: title,
        content: content,
        nikName: nikName,
    },
})
/**
 * 게시글 단일 조회
 * @param id
 * @returns {Promise<*>}
 */
export const postFindByIdFetcher = ({id}) => fetcher({
    method: "GET",
    path: `/api/posts/${id}`,
})
/**
 * 게시글 등록
 * @param title
 * @param content
 * @returns {Promise<*>}
 */
export const postCreateFetcher = ({title, content}) => fetcher({
    method: "POST",
    path: "/api/posts",
    body: {title, content}
});
/**
 * 게시글 수정
 * @param title
 * @param content
 * @param postId
 * @returns {Promise<*>}
 */
export const postUpdateFetcher = ({title, content, id}) => fetcher({
    method: "PATCH",
    path:`/api/posts/${id}`,
    body: {title, content},
},);
/**
 * 게시글 삭제
 * @param id
 * @returns {Promise<*>}
 */
export const postDeleteFetcher = ({id}) => fetcher({
    method: "DELETE",
    path: `/api/posts/${id}`,
    body: {id},
},);