import Header from "../component/Header";
import Visual from "../component/Visual";
import ImageShowcase from "../component/ImageShowcase";
import ImageTextCard from "../component/ImageTextCard";
import {cardImgList,titleImgList,interfaceList} from "../util";
import ImageShowcaseDetail from "../component/ImageShowcaseDetail";
import ImageTextCardReverse from "../component/ImageTextCardReverse";

const Home = () => {

    const event = () => {
        console.log("이벤트 발생");
    }
    const menus = [
        {
            id: 0,
            onClick: event,
            url: "/",
            text: "홈"
        },
        {
            id: 1,
            onClick: event,
            url: "/article/list",
            text: "글 리스트"
        },
        {
            id: 2,
            onClick: event,
            url: "/article/add",
            text: "새글 쓰기 "
        },
        {
            id: 3,
            onClick: event,
            url: "/article/detail",
            text: "상세 글보기 "
        }
    ]
    return (
        <>
            <Header
                title={"레트로그"}
                menus={menus}
            />
            <Visual/>
            <ImageShowcase
                title={"포켓몬스터 시리즈!"}
                subTitle={"잡은 포켓몬을 통신교환 케이블로 교환! 친구들이 모이는 롤 플레잉 등장!"}
                cardImgList={cardImgList}
            />
            <ImageTextCard
                title={titleImgList[3].name}
                description={titleImgList[3].description}
                imgInfo={titleImgList[3]}
                buttonText={"바로가기"}
                linkAddress={"/article/add"}
            />
            <ImageShowcaseDetail
                title={"게임 화면"}
                description={"여러 기능을 활용해 포켓몬의 능력을 100% 이끌어내라!"}
                linkAddress={"/"}
                buttonText={"상세페이지"}
                imgInfos={interfaceList}

            />
            <ImageTextCardReverse
                title={titleImgList[2].name}
                description={titleImgList[2].description}
                imgInfo={titleImgList[2]}
                buttonText={"바로가기"}
                linkAddress={"/article/add"}
            />
        </>
    );
}
export default Home;