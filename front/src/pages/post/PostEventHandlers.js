import useGetPost from "../../component/hooks/post/useGetPost";
const PAGE_GROUP_SIZE = 5;
export const handleOnPageChange = (dispatch) => {
    return (pageNum, pageCountSize, isSelected) => {
        if (isSelected) {
            return false;
        }
        const movedPages = useGetPost(pageNum, pageCountSize);
        dispatch(
            {
                "type": "PAGE_MOVE",
                "data": movedPages,
            }
        )
    }
};

export const handleOnClickPrev = (dispatch) => {
    return (currentPage, pageCountSize) => {
        let prevGroupLastPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE;
        if (prevGroupLastPage <= 0) {
            prevGroupLastPage = 1;
        }
        const prevPages = useGetPost(prevGroupLastPage, pageCountSize);
        dispatch(
            {
                "type": "PAGE_PREV",
                "data": prevPages,
            }
        )
    }
}

export const handleOnClickNext = (dispatch) => {
    return (currentPage, pageCountSize) => {
        let nextGroupFirstPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE + 1) * PAGE_GROUP_SIZE + 1;
        const nextPages = useGetPost(nextGroupFirstPage, pageCountSize);
        dispatch(
            {
                "type": "PAGE_NEXT",
                "data": nextPages,
            }
        )
    }
}

