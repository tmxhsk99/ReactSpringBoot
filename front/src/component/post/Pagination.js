import "./Pagination.css";
import {useContext} from "react";
import {PostDispatchContext} from "../../pages/post/Post";
import {PAGE_GROUP_SIZE} from "../../util/util";
import {useRecoilState} from "recoil";
import {pageInfoState} from "../../state/post/pageInfoState";

const Pagination = () => {
    const [usePageInfoState, setUsePageInfoState] = useRecoilState(pageInfoState);
    const {currentPage, pageCountSize, totalCount} = usePageInfoState;
    const {onPageChange, onClickPrev, onClickNext} = useContext(PostDispatchContext);
    const groupStartPage = Math.floor((currentPage - 1) / PAGE_GROUP_SIZE) * PAGE_GROUP_SIZE + 1;
    const totalPage = (totalCount / pageCountSize) + (totalCount % pageCountSize != 0 ? 1 : 0);
    const pageNumbers = [];
    const groupLastPage = groupStartPage + (PAGE_GROUP_SIZE - 1) >= totalPage ? totalPage : groupStartPage + (PAGE_GROUP_SIZE - 1);

    for (let i = groupStartPage; i <= groupLastPage; i++) {
        let isSelected = i === currentPage ? true : false;
        pageNumbers.push({
            isSelected: isSelected,
            pageNum: i,
        });
    }

    return (<section className="Pagination">
            <div className="prev">
                {currentPage > PAGE_GROUP_SIZE ?
                    <div onClick={() => onClickPrev(currentPage, pageCountSize)}>이전</div> : ""}
            </div>
            <div className="number">
                {
                    pageNumbers.map(page => <div
                        key={page.pageNum}
                        onClick={() => onPageChange(page.pageNum, pageCountSize, page.isSelected)}
                        className={page.isSelected ? "selected" : "notSelected"}>{page.pageNum}</div>)
                }
            </div>
            <div className="next">
                {currentPage < totalPage && groupLastPage < totalPage ?
                    <div onClick={() => onClickNext(currentPage, pageCountSize)}>다음</div> : ""}
            </div>
        </section>
    )

}

export default Pagination;