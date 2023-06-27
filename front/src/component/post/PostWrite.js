import "./PostWrite.css";
import TitleContainer from "../common/TitleContainer";
import Article from "./Article";
import SearchAndWrite from "../common/SearchAndWrite";
import BasicNesBtn from "../common/button/BasicNesBtn";
import Aside from "../common/Aside";
import React, {useState} from "react";
import {postCreateValidation} from "../../util/validationUtil";
import {postCreateFetcher} from "../../query/post/postApiService";

const PostWrite = () => {

    return (
        <div className="PostWrite">
            <Aside/>
            <section className="write nes-container">
                <TitleContainer title={"글쓰기"}/>
                <Article/>
            </section>
            <Aside/>
        </div>
    );
}

export default PostWrite;
