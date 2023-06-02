import "./Header.css";
import {Link} from "react-router-dom";

const Header = ({title, menus}) => {
    return (
        <header>
            <div className="inner">
                <h1>{title}</h1>
                <ul className="nav">
                    {menus.map((menu) => {
                        return <li key={menu.id} onClick={menu.onClick}><Link to = {menu.url}>{menu.text}</Link></li>
                    })}
                </ul>
            </div>
        </header>
    )
}

export default Header;