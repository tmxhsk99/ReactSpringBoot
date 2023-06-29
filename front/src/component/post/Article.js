import "./Article.css";
import SearchAndWrite from "../common/SearchAndWrite";
import React, {useEffect, useRef, useState} from "react";
import BasicNesBtn from "../common/button/BasicNesBtn";
import {postCreateValidation} from "../../util/validationUtil";
import {postCreateFetcher, postUpdateFetcher} from "../../query/post/postApiService";
import {useNavigate} from "react-router-dom";
import Loading from "../common/Loading";

const Article = ({post, type}) => {
    const [textArea, setTextArea] = useState("");
    const textareaRef = useRef(null);
    const titleTextRef = useRef(null);
    const [titleText, setTitleText] = useState("");
    const navigate = useNavigate();
    const onChangeTitleText = (e) => {
        if (e.target.value.length >= 100) {
            alert("100자 이하로 작성해주세요.");
            setTitleText(e.target.value.substring(0, 100));
            titleTextRef.current.focus();
            return;
        }
        setTitleText(e.target.value);
    }
    const onChangeTextArea = (e) => {

        if (e.target.value.length >= 10000) {
            alert("10000자 이하로 작성해주세요.");
            setTextArea(e.target.value.substring(0, 10000));
            textareaRef.current.focus();
            return;
        }
        setTextArea(e.target.value);
    }

    function handleTextareaChange() {
        const textarea = textareaRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
    }

    const onSubmitPost = async ({title, content}) => {
        if (!postCreateValidation({title, content})) {
            return;
        }
        if (type === "edit") {
            await void postUpdateFetcher({title, content, id: post.id});
        }
        if (type === "add") {
            await void postCreateFetcher({title, content});
        }
        navigate("/post/list");

    }

    useEffect(() => {
            if (post) {
                setTitleText(post.title);
                setTextArea(post.content);
            }
        }
        , [post]);

    if (type === "edit" && !titleText && !textArea) {
        return (
            <div className="Article">
                <Loading></Loading>
            </div>
        )
    } else {
        return (
            <div className="Article">
                <div className="title nes-field">
                    <label htmlFor="name_field">제목</label>
                    <input type="text"
                           maxLength={100}
                           className="nes-input"
                           ref={titleTextRef}
                           value={titleText}
                           onChange={onChangeTitleText}
                    />
                </div>
                <div className="content">
                    <label htmlFor="textarea_field">내용</label>
                    <textarea className="nes-textarea"
                              ref={textareaRef}
                              value={textArea}
                              onChange={(event) => {
                                  handleTextareaChange(event);
                                  onChangeTextArea(event);
                              }}
                              maxLength={10000}
                    />
                    <SearchAndWrite
                        rightChildren={`내용 : ${textArea.length}/10000`}
                    />
                </div>
                <SearchAndWrite
                    centerChildren={
                        <BasicNesBtn title={"등록"}
                                     onClick={() => onSubmitPost({title: titleText, content: textArea})}
                        />
                    }
                />
            </div>

        );
    }
}

export default Article;