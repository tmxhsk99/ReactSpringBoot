import "./Header.css";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = ({title, menus}) => {
    const [isMenuToggleActive, setIsMenuToggleActive] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1200) {
                setIsMenuToggleActive(false);
            }
        }
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    const handleMenuClick = () => {
        setIsMenuToggleActive(!isMenuToggleActive)
    }

    return (
        <header className={isMenuToggleActive ? 'active' : ''}>
            <div className="inner">
                <h1>{title}</h1>
                <ul className="nav">
                    {menus.map((menu) => {
                        return <li key={menu.id} onClick={menu.onClick}><Link to={menu.url}>{menu.text}</Link></li>
                    })}
                </ul>
                {/*모바일 버전 삼색선*/}
                <Link onClick={handleMenuClick} to="" className="navBtn">
                    <span key="0"></span>
                    <span key="1"></span>
                    <span key="2"></span>
                </Link>
            </div>
        </header>
    )
}

export default Header;