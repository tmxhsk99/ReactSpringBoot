import "./WriterInfoContainer.css";
import WriterInfo from "./WriterInfo";
import WriterAuth from "./WrtierAuth";
import useAuthCheck from "../hooks/user/useAuthCheck";

/**
 * 글쓴이 정보를 담고 있는 컴포넌트
 *  WriterAuth 컴포넌트는 로그인 상태인 경우에만 보여준다.
 * @param userImageUrl
 * @param nickName
 * @param viewCount
 * @param createdTime
 * @param likeCount
 * @returns {JSX.Element}
 * @constructor
 */
const WriterInfoContainer = ({userImageUrl = null, nickName = "익명", viewCount = 0, createdTime, likeCount = 0}) => {
    const authCheck = useAuthCheck();

    return (
        <div className="WriterInfoContainer">
            <WriterInfo
                createdTime={createdTime}
                userImageUrl={userImageUrl}
                nickName={nickName}
                viewCount={viewCount}
                likeCount={likeCount}
            />
            {authCheck && (
                <WriterAuth/>
            )}
        </div>
    );

}

export default WriterInfoContainer;