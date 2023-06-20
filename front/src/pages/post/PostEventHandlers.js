import {PAGE_GROUP_SIZE} from "../../util/util";


/**
 * 페이지 클릭시
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *, *): (boolean|undefined))|*}
 */
export const handleOnPageChange = (navigate, posts, setPosts) => {

    return async (pageNum, pageSize, isSelected) => {

        if (isSelected) {
            return false;
        }
        await setPosts({
            postList:[
                ...posts.postList,
            ],
            pageInfo: {
                ...posts.pageInfo,
                currentPage: pageNum,
                pageSize: pageSize,
            }
        });
        await localStorage.setItem("posts", JSON.stringify({
            postList:[
                ...posts.postList,
            ],
            pageInfo: {
                ...posts.pageInfo,
                currentPage: pageNum,
                pageSize: pageSize,
            }
        }))

        navigate("/post/list");
    }
};
/**
 * 다음 버튼 클릭 시 이벤트
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const handleOnClickPrev = (navigate, posts, setPosts) => {

    return async (currentPage, pageSize) => {
        let prevGroupLastPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE;
        if (prevGroupLastPage <= 0) {
            prevGroupLastPage = 1;
        }

        await setPosts({
            postList:[
                ...posts.postList,
            ],
            pageInfo: {
                ...posts.pageInfo,
                currentPage: prevGroupLastPage,
                pageSize: pageSize,
            }
        });
        await localStorage.setItem("posts", JSON.stringify({
            postList:[
                ...posts.postList,
            ],
            pageInfo: {
                ...posts.pageInfo,
                currentPage: prevGroupLastPage,
                pageSize: pageSize,
            }
        }))

        navigate("/post/list")
    };
}
/**
 * 이전 버튼 클릭시 이벤트
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const handleOnClickNext = (navigate, posts, setPosts) => {

    return async (currentPage, pageSize) => {
        let nextGroupFirstPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE + 1) * PAGE_GROUP_SIZE + 1;

        await setPosts({
            postList:[
                ...posts.postList,
            ],
            pageInfo: {
                ...posts.pageInfo,
                currentPage: nextGroupFirstPage,
                pageSize: pageSize,
            }
        });
        await localStorage.setItem("posts", JSON.stringify({
            postList:[
                ...posts.postList,
            ],
            pageInfo: {
                ...posts.pageInfo,
                currentPage: nextGroupFirstPage,
                pageSize: pageSize,
            }
        }))
        navigate("/post/list");
    }
}

