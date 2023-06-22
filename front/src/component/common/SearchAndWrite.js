import "./SearchAndWrite.css";

const SearchAndWrite = ({leftChildren, centerChildren, rightChildren}) => {
    return (
        <div className="SearchAndWrite">
            <div className="left">{leftChildren}</div>
            <div className="center">{centerChildren}</div>
            <div className="right">{rightChildren}</div>
        </div>
    );
}

export default SearchAndWrite;