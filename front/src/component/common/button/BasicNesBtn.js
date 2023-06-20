import "./BasicNesBtn.css";
import {Link} from "react-router-dom";

const BasicNesBtn = ({title, onClick, link}) => {
    return (
        <Link to={link} className="BasicNesBtn nes-btn" onClick={onClick}>{title}</Link>
    );
}

export default BasicNesBtn;