import "./WriterInfoContainer.css";

const WriterAuth = () => {
    // todo 로그인 시 공유,차단,신고 기능을을 보여준다 추후 해당 기능 요청 기능 추가
    return (
        <div className="WriterAuth">
            <div className="buttons">
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="ellipsis-v"
                     className="svg-inline--fa fa-ellipsis-v fa-w-6" role="img"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 192 512">
                    <path fill="#AAAAAA"
                          d="M96 184c39.8 0 72 32.2 72 72s-32.2 72-72 72-72-32.2-72-72 32.2-72 72-72zM24 80c0 39.8 32.2 72 72 72s72-32.2 72-72S135.8 8 96 8 24 40.2 24 80zm0 352c0 39.8 32.2 72 72 72s72-32.2 72-72-32.2-72-72-72-72 32.2-72 72z"></path>
                </svg>
            </div>
            <ul className="popUp">
                <div className="frm">
                    <li className="report">
                        <button type="button"><i className="fa-regular fa-flag"></i>&nbsp;신고</button>
                    </li>
                    <li className="block">
                        <button type="button"><i className="fa-solid fa-ban"></i>&nbsp;차단</button>
                    </li>
                    <li className="share">
                        <button type="button" id="share"><i className="fa-solid fa-share-from-square"></i>공유
                        </button>
                    </li>
                </div>
            </ul>
        </div>
    );
}

export default WriterAuth;