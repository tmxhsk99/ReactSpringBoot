import "./PostItem.css";
import {Link} from "react-router-dom";

const PostItem = ({id,title, content, type = "none", createdTime, updatedTime, commentCount = 0, nickName = "익명",viewCount = 0,isSelected = false}) => {
    return (
        <Link className={isSelected ? "isSelected PostItem":"PostItem"} to={`/post/detail/${id}`}>
            <div className="image">
                <i className="fa-regular fa-file-lines"/>
            </div>
            <div className="info">
                <div className="titleContainer">
                    <span className="title">
                        <span className="text">
                            {type != "none" ? <span className="pre">{`[${type}]`}</span> : ""}
                            {title}
                        </span>
                        {commentCount != 0 ? <span className="commentCount">{commentCount}</span> : ""}
                    </span>
                </div>
                <div className="etc">
                    <div className="nickName">{nickName}</div>
                    <div className="dot"></div>
                    <div className="dateTime">{createdTime}</div>
                    <div className="dot"></div>
                    <div className="viewCount">{viewCount}</div>
                </div>
            </div>

        </Link>
    );
}

export default PostItem;