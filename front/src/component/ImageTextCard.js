import "./ImageTextCard.css";
import {Link} from "react-router-dom";
const ImageTextCard = ({title,description,imgInfo,linkAddress,buttonText}) => {

    return (
        <div className="depth ImageTextCard">
            <div className="inner">
                <div className="img_wrap">
                    <img alt={imgInfo.description} src={imgInfo.imgSrc}/>
                </div>
                <div className="txt_wrap">
                    <h2 className="tit_medium">
                        {title}
                    </h2>
                    <p className="depth_txt">
                        {description}
                    </p>
                    <Link to={linkAddress} className="cont_btn">
                        <span>{buttonText}</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ImageTextCard;