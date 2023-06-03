import "./ImageShowCaseCircle.css";
import {Link} from "react-router-dom";

const ImageShowcaseCircle = ({title, description, btnLink, btnText, imageInfos}) => {
    return (
        <div className="depth ImageShowcaseCircle">
            <div className="inner">
                <div className="txt_wrap txt_center">
                    <h2 className="tit_medium">{title}</h2>
                    <p className="depth_txt">
                        {description}
                    </p>
                    <Link to={btnLink} className="cont_btn">
                        <span>{btnText}</span>
                    </Link>
                </div>
                <ul className="ImageShowcaseCircle_list">
                    {
                        imageInfos.map((imageInfo) => {
                            return (
                                <li>
                                    <div className="img_wrap">
                                        <img alt={imageInfo.description} src={imageInfo.imgSrc}/>
                                    </div>
                                    <p className="list_txt txt_center">
                                        {imageInfo.description}
                                    </p>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>


        </div>
    )
};

export default ImageShowcaseCircle;