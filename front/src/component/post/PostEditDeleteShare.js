import "./PostEditDeleteShare.css"
import {useState} from "react";
import {Link} from "react-router-dom";

const PostEditDeleteShare = ({findPost}) => {
    const [isClicked, setIsClicked] = useState(false);
    const handleOnClick = () => {
        setIsClicked(!isClicked);
    }
    const isActivePopUp = isClicked ? "popUp isActive" : "popUp";

    return (
        <div className="PostEditDeleteShare">
            <div onClick={handleOnClick} className="buttons">
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
                <li className="delete">
                    <button name="submit" value="delete"><i className="fa-regular fa-trash-alt"></i>&nbsp;삭제
                    </button>
                </li>
                <li className="share">
                    <button type="button" id="share"><i className="fa-solid fa-share-from-square"></i>공유
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default PostEditDeleteShare;