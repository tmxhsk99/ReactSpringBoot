import Header from "../component/common/Header";
import Visual from "../component/home/Visual";
import ImageShowcase from "../component/home/ImageShowcase";
import ImageTextCard from "../component/home/ImageTextCard";
import {SITE_NAME, cardImgList, titleImgList, interfaceList, personList, DEFAULT_MENU} from "../util/util";
import ImageShowcaseDetail from "../component/home/ImageShowcaseDetail";
import ImageTextCardReverse from "../component/home/ImageTextCardReverse";
import ImageShowcaseCircle from "../component/home/ImageShowcaseCircle";
import Footer from "../component/common/Footer";

const Home = () => {
    return (
        <>
            <Header
                title={SITE_NAME}
                menus={DEFAULT_MENU}
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
            <ImageShowcaseCircle
                title={"Former Director"}
                description={"1st generation to 9th generation"}
                btnText={"상세보기"}
                btnLink={"/"}
                imageInfos={personList}
            />
            <Footer
                title={SITE_NAME}
                menus={DEFAULT_MENU}
            />
        </>
    );
}
export default Home;