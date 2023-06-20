import "./HorizonButtonList.css";

const HorizonButtonList = ({centerChild, leftChild, rightChild}) => {
    return (
        <div className="HorizonButtonList">
            <div className="left">{leftChild}</div>
            <div className="center">{centerChild}</div>
            <div className="right">{rightChild}</div>
        </div>
    );
};

export default HorizonButtonList;