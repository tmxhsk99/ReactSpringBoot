import {PAGE_GROUP_SIZE} from "../../util/util";


/**
 * 페이지 클릭시
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *, *): (boolean|undefined))|*}
 */
export const handleOnPageChange = (navigate, pageInfo, setPageInfo) => {

    return (pageNum, pageCountSize, isSelected) => {

        if (isSelected) {
            return false;
        }
        setPageInfo({
            ...pageInfo,
            currentPage: pageNum,
            pageCountSize: pageCountSize,
        });
        localStorage.setItem(pageInfo,{
                    ...pageInfo,
                    currentPage: pageNum,
                    pageCountSize: pageCountSize,
                })

        navigate("/post/list");
    }
};
/**
 * 다음 버튼 클릭 시 이벤트
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const handleOnClickPrev = (navigate, pageInfo, setPageInfo) => {

    return (currentPage, pageCountSize) => {
        let prevGroupLastPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE;
        if (prevGroupLastPage <= 0) {
            prevGroupLastPage = 1;
        }
        setPageInfo({
            ...pageInfo,
            currentPage: prevGroupLastPage,
            pageCountSize: pageCountSize,
        });
        navigate("/post/list")
    };
}
/**
 * 이전 버튼 클릭시 이벤트
 * @param getPost
 * @param dispatch
 * @returns {(function(*, *): Promise<void>)|*}
 */
export const handleOnClickNext = (navigate, pageInfo, setPageInfo) => {

    return (currentPage, pageCountSize) => {
        let nextGroupFirstPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE + 1) * PAGE_GROUP_SIZE + 1;

        setPageInfo({
            ...pageInfo,
            currentPage: nextGroupFirstPage,
            pageCountSize: pageCountSize,
        });
        navigate("/post/list");
    }
}

