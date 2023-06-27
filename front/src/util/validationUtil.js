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

/**
 * 글 등록시 무결성 검증
 * @param title
 * @param post
 * @returns {boolean}
 */
export const postCreateValidation = ({title, content}) => {
    if(!title){
        alert("제목을 입력해주세요.");
        return false;
    }
    if(title.length > 100){
        alert("제목은 100자 이하로 입력해주세요.");
        return false;
    }
    if(!content){
        alert("내용을 입력해주세요.");
        return false;
    }
    if(content.length > 10000){
        alert("제목은 10000자 이하로 입력해주세요.");
        return false;
    }
    return true;
}