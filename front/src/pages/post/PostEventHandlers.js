import {PAGE_GROUP_SIZE} from "../../util/constUtil";

/**
 * 게시글 상태 업데이트 공통함수
 * @param setPosts
 * @param posts
 * @param pageNum
 * @param pageSize
 * @param searchCondition
 * @returns {Promise<void>}
 */
async function updatePostsState(setPosts, posts, pageNum, pageSize = posts.pageInfo.pageSize,
                                searchCondition = {
                                    title: "",
                                    content: "",
                                    nickName: "",
                                }
) {
    await setPosts({
        postList: [
            ...posts.postList,
        ],
        searchCondition: {
            ...posts.searchCondition,
            title: searchCondition.title,
            content: searchCondition.content,
            nickName: searchCondition.nickName,
        },
        pageInfo: {
            ...posts.pageInfo,
            currentPage: pageNum,
            pageSize: pageSize,
        }
    });
    await localStorage.setItem("posts", JSON.stringify({
        postList: [
            ...posts.postList,
        ],
        searchCondition: {
            ...posts.searchCondition,
            title: searchCondition.title,
            content: searchCondition.content,
            nickName: searchCondition.nickName,
        },
        pageInfo: {
            ...posts.pageInfo,
            currentPage: pageNum,
            pageSize: pageSize,
        }
    }))
}

/**
 * 페이지네이션 페이지 클릭시
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *, *): (boolean|undefined))|*}
 */
export const handleOnPageChange = (navigate, posts, setPosts) => {

    return async (pageNum, pageSize, isSelected) => {

        if (isSelected) {
            return false;
        }
        await updatePostsState(setPosts, posts, pageNum, pageSize);

        navigate("/post/list");
    }
};
/**
 * 페이지네이션 다음 버튼 클릭 시 이벤트
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

        await updatePostsState(setPosts, posts, prevGroupLastPage);

        navigate("/post/list")
    };
}
/**
 * 페이지네이션 이전 버튼 클릭시 이벤트
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const handleOnClickNext = (navigate, posts, setPosts) => {

    return async (currentPage, pageSize) => {
        let nextGroupFirstPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE + 1) * PAGE_GROUP_SIZE + 1;

        await updatePostsState(setPosts, posts, nextGroupFirstPage);
        navigate("/post/list");
    }
}
/**
 * 검색 버튼 클릭시 이벤트
 * @param navigate
 * @param posts
 * @param setPosts
 * @returns {(function(*): Promise<void>)|*}
 */
export const handleOnClickSearch = (navigate, posts, setPosts) => {
    return async (searchCondition) => {
        console.log("searchCondition", searchCondition);
        let parsedSearchCondition = {};
        searchCondition.type.map((it) => {
            parsedSearchCondition[it] = searchCondition.keyword;
        });
        console.log("parsedSearchCondition", parsedSearchCondition);
        await updatePostsState(setPosts, posts, 1, posts.pageInfo.pageSize, parsedSearchCondition);
        navigate("/post/list");
    }
}
