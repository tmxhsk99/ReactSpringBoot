import "./ImageShowcaseDetail.css";
import {Link} from "react-router-dom";

const ImageShowcaseDetail = ({title, description, buttonText, imgInfos, linkAddress}) => {
    return (
        <div className="depth ImageShowcaseDetail">
            <div className="inner">
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

                <ul className="ImageShowcaseDetail_list txt_center">
                    {
                        imgInfos.map((imgInfo) => {
                            return (
                                <>
                                    <li>
                                        <Link to={imgInfo.imgLink}>
                                            <h4>{imgInfo.title}</h4>
                                            <p className="list_txt">{imgInfo.description}</p>
                                            <div className="img_wrap">
                                                <img alt={imgInfo.description} src={imgInfo.imgSrc}/>
                                            </div>
                                        </Link>
                                    </li>

                                </>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default ImageShowcaseDetail;