import cardImg0 from "./assets/img/home/pika.png"
import cardImg1 from "./assets/img/home/ishgg.png"
import cardImg2 from "./assets/img/home/rizamong.png"
import cardImg3 from "./assets/img/home/gbw.png"
import title0 from "./assets/img/home/title0.png"
import title1 from "./assets/img/home/title1.png"
import title2 from "./assets/img/home/title2.png"
import title3 from "./assets/img/home/title3.png"



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
export const cardImgList = [
    {
        id:0,
        name:"피카츄",
        description: "양 볼에는 전기를 저장하는 주머니가 있다. 화가 나면 저장한 전기를 단숨에 방출한다.",
        img: getCardImagById(0),
    },
    {
        id:1,
        name:"이상해꽃",
        description: "햇빛을 쬐어 몸이 따뜻해지면 꽃잎에서 기분 좋은 향기가 퍼진다.",
        img: getCardImagById(1),
    },
    {
        id:2,
        name:"리자몽",
        description: "날개로 넓은 하늘을 높게 난다. 싸움의 경험을 쌓으면 불꽃의 온도가 높아진다.",
        img: getCardImagById(2),
    },
    {
        id:3,
        name:"거북왕",
        description: "등의 분사구에서 기세좋게 물을 내뿜을 때 힘좋게 대지를 딛는다.",
        img: getCardImagById(3),
    },
];
