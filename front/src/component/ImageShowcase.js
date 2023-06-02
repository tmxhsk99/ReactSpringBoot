import "./ImageShowcase.css";

const ImageShowcase = ({title, subTitle, cardImgList}) => {
    return (
        <div className="depth image-showcase">
            <div className="inner">
                <div className="txt_wrap txt_center">
                    <h2 className="tit_small">
                        {title}
                    </h2>
                    <p className="sub_txt">
                        {subTitle}
                    </p>
                </div>
                <ul className="image-showcase_list txt_center">
                    {
                        cardImgList.map((cardImg) => {
                            return (
                                <li>
                                    <div className="img_wrap">
                                        <img alt={cardImg.name} src={cardImg.imgSrc}/>
                                    </div>
                                    <p className="cont_txt">{cardImg.description}</p>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    )
}

export default ImageShowcase;