import "./Loading.css";
import Aside from "./Aside";

const Loading = () => {
    return (
        <div className="Loading">
            <Aside/>
            <div className="nes-container">
                <div className="loader"></div>
            </div>
            <Aside/>
        </div>
    )
}

export default Loading;