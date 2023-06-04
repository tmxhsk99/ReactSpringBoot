import "./ImageShowcase.css";

const ImageShowcase = ({title, subTitle, cardImgList}) => {
    return (
        <div className="depth ImageShowcase">
            <div className="inner">
                <div className="txt_wrap txt_center">
                    <h2 className="tit_small">
                        {title}
                    </h2>
                    <p className="sub_txt">
                        {subTitle}
                    </p>
                </div>
                <ul className="ImageShowcase_list txt_center">
                    {
                        cardImgList.map((cardImg) => {
                            return (
                                <li key={cardImg.id}>
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