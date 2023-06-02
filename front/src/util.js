import cardImg0 from "./assets/img/home/pika.png"
import cardImg1 from "./assets/img/home/ishgg.png"
import cardImg2 from "./assets/img/home/rizamong.png"
import cardImg3 from "./assets/img/home/gbw.png"
import title0 from "./assets/img/home/title0.png"
import title1 from "./assets/img/home/title1.png"
import title2 from "./assets/img/home/title2.png"
import title3 from "./assets/img/home/title3.png"
import interface0 from "./assets/img/home/interface0.png"
import interface1 from "./assets/img/home/interface1.png"
import interface2 from "./assets/img/home/interface2.png"
import interface3 from "./assets/img/home/interface3.png"


export const getCardImagById = (imgId) => {
    const targetCardId = String(imgId);
    switch (targetCardId) {
        case "0":
            return cardImg0;
        case "1":
            return cardImg1;
        case "2":
            return cardImg2;
        case "3":
            return cardImg3;
        default:
            return null;
    }
}

export const getTitleImg = (imgId) => {
    const targetTitleId = String(imgId);
    switch (targetTitleId) {
        case "0":
            return title0;
        case "1":
            return title1;
        case "2":
            return title2;
        case "3":
            return title3;
        default:
            return null;
    }
}
export const getInterfaceImg = (imgId) => {
    const targetInterfaceId = String(imgId);
    switch (targetInterfaceId) {
        case "0":
            return interface0;
        case "1":
            return interface1;
        case "2":
            return interface2;
        case "3":
            return interface3;
        default:
            return null;
    }
}
export const cardImgList = [
    {
        id: 0,
        name: "피카츄",
        description: "양 볼에는 전기를 저장하는 주머니가 있다. 화가 나면 저장한 전기를 단숨에 방출한다.",
        imgSrc: getCardImagById(0),
    },
    {
        id: 1,
        name: "이상해꽃",
        description: "햇빛을 쬐어 몸이 따뜻해지면 꽃잎에서 기분 좋은 향기가 퍼진다.",
        imgSrc: getCardImagById(1),
    },
    {
        id: 2,
        name: "리자몽",
        description: "날개로 넓은 하늘을 높게 난다. 싸움의 경험을 쌓으면 불꽃의 온도가 높아진다.",
        imgSrc: getCardImagById(2),
    },
    {
        id: 3,
        name: "거북왕",
        description: "등의 분사구에서 기세좋게 물을 내뿜을 때 힘좋게 대지를 딛는다.",
        imgSrc: getCardImagById(3),
    },
];

export const titleImgList = [
    {
        id: 0,
        name: "레드 버전",
        description: "잡은 몬스터를 통신 케이블로 교환! 동료를 모으는 롤플레잉 등장!",
        imgSrc: getTitleImg(0),
    },
    {
        id: 1,
        name: "골드 버전",
        description: "새로운 시나리오와 맵으로, 새로운 포켓몬이 속속히 등장!!",
        imgSrc: getTitleImg(1),
    },
    {
        id: 2,
        name: "실버 버전",
        description: "새로운 시나리오와 맵으로, 새로운 포켓몬이 속속히 등장!!",
        imgSrc: getTitleImg(2),
    },
    {
        id: 3,
        name: "크리스탈 버전",
        description: "포켓몬 크리스탈의 세계에 잘 왔다!\n" +
            "포켓몬 크리스탈에선 소년과 소녀 주인공을 고를 수 있다!\n" +
            "포켓몬들의 다양한 액션에도 주목이다! 수많은 포켓몬을 모아서, 포켓몬들과 함께 새로운 모험을 즐기자!",
        imgSrc: getTitleImg(3),
    }
];