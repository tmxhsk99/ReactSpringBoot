import {Link} from "react-router-dom";
import "./Visual.css"
const Visual = () => {
    return (
        <div className="visual">
            <div className="visu_txt">
                <h2 className="tit_big">
                    Slider title
                </h2>
                <p className="sub_txt">
                    때 계절이 마디씩 가난한 가득 하나에 듯합니다. 나는 하나 아침이 아직 다 추억과 어머니 위에 봅니다.
                </p>
                <Link to ="" className="cont_btn">
                    <span>button</span>
                </Link>
            </div>
        </div>
    )
}

export default Visual;