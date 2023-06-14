/**
 * 정렬 함수를 반환하는 유틸 함수
 * @param sortType
 */
export const sortTypeUtil = (sortType) =>{

    switch (sortType) {
        case "ID_DESC": {
            return idDesc;
        }
        case "ID_ASC": {
            return idASC;
        }
        default:{
            // Default는 ID 내림차순
            return idDesc
        }

    }
}

const idDesc = (a,b) => {
    return Number(b.id) - Number(a.id);
}

const idASC = (a,b) => {
    return Number(a.id) - Number(b.id);
}