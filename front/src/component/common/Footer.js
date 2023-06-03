import "./Footer.css";
import {Link} from "react-router-dom";

const Footer = ({title,menus,copyRightText = 'Copyright © 2023 Kim ju Hyeon. All rights reserved.'}) => {
    return (
        <footer>
            <div className="inner">
                <div className="left">
                    <h3>{title}</h3>
                    <p className="copy">
                        {copyRightText}
                    </p>
                </div>
                <ul className="nav">
                    {menus.map((menu) => {
                        return <li key={menu.id} onClick={menu.onClick}><Link to = {menu.url}>{menu.text}</Link></li>
                    })}
                </ul>
            </div>
        </footer>
    );
}
export default Footer;
