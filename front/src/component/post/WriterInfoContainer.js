import "./WriterInfoContainer.css";
import WriterInfo from "./WriterInfo";
import WriterAuth from "./WriterAuth";
import useAuthCheck from "../hooks/user/useAuthCheck";
import PostEditDeleteShare from "./PostEditDeleteShare";

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
const WriterInfoContainer = ({findPost: findPost}) => {

    const authCheck = useAuthCheck();

    return (
        <div className="WriterInfoContainer">
            <WriterInfo
                createdTime={findPost.createdTime}
                userImageUrl={findPost.userImageUrl}
                nickName={findPost.nickName}
                viewCount={findPost.viewCount}
                likeCount={findPost.likeCount}
            />
            <div className="right">
                <PostEditDeleteShare findPost={findPost}/>
            </div>
            {authCheck && (
                <WriterAuth/>
            )}

        </div>
    );

}

export default WriterInfoContainer;