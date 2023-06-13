import "./Loading.css";
import Aside from "./Aside";

const Loading = () => {
    return (
        <div className="Loading">
            <Aside/>
            <div className="nes-container is-dark">
                <div className="loader"></div>
                <h1>잠시만 기다려 주세요...</h1>
            </div>
            <Aside/>
        </div>
    )
}

export default Loading;