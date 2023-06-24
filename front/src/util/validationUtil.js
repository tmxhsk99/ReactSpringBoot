/**
 * 검색 조건 객체에 있는 검색 키워드를 반환한다.
 * @param searchCondition
 * @returns {string|*}
 */
export const postSearchConditionGetKeyword = (searchCondition) => {
    if(searchCondition.title){
        return searchCondition.title;
    }
    if(searchCondition.content){
        return searchCondition.content;
    }
    if(searchCondition.nickName){
        return searchCondition.nickName;
    }

    return "";
}