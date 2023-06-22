import "./Search.css";
import BasicNesBtn from "./button/BasicNesBtn";
import {useState} from "react";

/**
 * 검색 타입 + 검색창 + 검색 버튼
 * @param searchType 검색타입 배열
 * @param searchEvent 검색시 이벤트처리 함수
 * @param navigate 페이지 이동 url
 * @returns {JSX.Element}
 * @constructor
 */
const Search = ({searchType, searchEvent, navigate}) => {
    const [keyword, setKeyword] = useState("");
    const [searchTypeState, setSearchTypeState] = useState([searchType[0].value]);

    const handleChangeSelect = (e) => {
        // 검색조건 배열
        setSearchTypeState(e.target.value.split(","));
        console.log(e.target.value);
    }

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
        console.log(e.target.value);
    }

    return (
        <div className="Search">
            <div className="search_wrap">
                <div className="type nes-select">
                    <select onChange={handleChangeSelect} required id="default_select">
                        {
                            searchType.map((it, idx) => {
                                return <option key={String(idx)} value={it.value}>{it.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="input_wrap nes-field">
                    <input type="text" maxLength="50" onChange={onChangeKeyword} className="nes-input"/>
                </div>
                <BasicNesBtn title={"검색"} onClick={() => {
                    searchEvent({type: searchTypeState, keyword: keyword});
                }}></BasicNesBtn>
            </div>
        </div>
    );
}

export default Search;