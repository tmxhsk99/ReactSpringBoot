import "./Search.css";
import BasicNesBtn from "./button/BasicNesBtn";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {postsState} from "../../state/post/postsState";
import {postSearchConditionGetKeyword} from "../../util/validationUtil";

/**
 * 검색 타입 + 검색창 + 검색 버튼
 * @param searchType 검색타입 배열
 * @param searchEvent 검색시 이벤트처리 함수
 * @param navigate 페이지 이동 url
 * @returns {JSX.Element}
 * @constructor
 */
const Search = ({searchType, searchEvent}) => {
    const posts = useRecoilValue(postsState);
    const searchCondition = posts.searchCondition;
    const [keyword, setKeyword] = useState(postSearchConditionGetKeyword(searchCondition));
    const [searchTypeState, setSearchTypeState] = useState([searchType[0].value]);

    const selectedSearchType = () => {
         let result = "";
         if(searchCondition.title){
             result = "title";
         }
         if(searchCondition.content){
             result += ",content";
         }
         if(searchCondition.nickName){
             result = "nickName";
         }
         return result;
     }

    const [defaultSearchType, setDefaultSearchType] = useState(selectedSearchType());


    const handleChangeSelect = (e) => {
        // 검색조건 배열
        setSearchTypeState(e.target.value.split(","));
        setDefaultSearchType(e.target.value);

    }

    const onChangeKeyword = (e) => {
        setKeyword(e.target.value);
    }

    // 엔터시 검색 처리
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
            searchEvent({type: searchTypeState, keyword: keyword});
      }
    };


    return (
        <div className="Search">
            <div className="search_wrap">
                <div className="type nes-select">
                    <select value={defaultSearchType} onChange={handleChangeSelect} required id="default_select">
                        {
                            searchType.map((it, idx) => {
                                return <option key={String(idx)} value={it.value}>{it.name}</option>
                            })
                        }
                    </select>
                </div>
                <div className="input_wrap nes-field">
                    <input type="text" maxLength="50" onKeyDown={handleKeyDown} onChange={onChangeKeyword} value={keyword} className="nes-input"/>
                </div>
                <BasicNesBtn title={"검색"} onClick={() => {
                    searchEvent({type: searchTypeState, keyword: keyword});
                }}></BasicNesBtn>
            </div>
        </div>
    );
}

export default Search;