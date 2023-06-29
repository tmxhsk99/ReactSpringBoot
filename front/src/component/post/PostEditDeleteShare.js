import "./PostEditDeleteShare.css"
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {postDeleteFetcher} from "../../query/post/postApiService";

const PostEditDeleteShare = ({findPost}) => {
    const [isClicked, setIsClicked] = useState(false);
    const isActivePopUp = isClicked ? "popUp isActive" : "popUp";
    const navigate = useNavigate();

    const onEditBtnClick = () => {
        setIsClicked(!isClicked);
    }

    const onDeleteBtnClick = () => {
        const result = window.confirm("정말 삭제하시겠습니까?");
        if (result) {
            void postDeleteFetcher({id: findPost.id});
            navigate("/post/list");
        }
    }
    return (
        <div className="PostEditDeleteShare">
            <div onClick={onEditBtnClick} className="buttons">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-v"
                     className="svg-inline--fa fa-ellipsis-v fa-w-6" role="img" xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 192 512">
                    <path fill="#AAAAAA"
                          d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path>
                </svg>
            </div>
            <ul className={isActivePopUp}>
                <li className="edit">
                    <Link to={`/post/edit/${findPost.id}`}>
                        <button type="button" name="submit" value="edit">
                            <i className="fa-regular fa-edit"></i>&nbsp;수정
                        </button>
                    </Link>
                </li>
                <li className="delete" onClick={onDeleteBtnClick}>
                    <button><i className="fa-regular fa-trash-alt"></i>&nbsp;삭제
                    </button>
                </li>
                <li className="share">
                    <button type="button" id="share"><i className="fa-solid fa-share-from-square"></i>&nbsp;공유
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default PostEditDeleteShare;