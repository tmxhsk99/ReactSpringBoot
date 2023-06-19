import {useRecoilState} from "recoil";
import {loginState} from "../../../state/user/loginState";
import {useEffect} from "react";
import jwtDecode from "jwt-decode";

function useAuthCheck (){
    const [login, setLogin] = useRecoilState(loginState);
    const accessToken = localStorage.getItem("accessToken");
    //todo: accessToken이 만료되었을 때, refreshToken을 이용하여 accessToken을 재발급 받아야 함.
    useEffect(() => {
        if (accessToken) {
            try {
                const jwt = jwtDecode(accessToken);
                // accssToken이 만료되었는지 확인
                jwt.get("exp") > Date.now() / 1000 ? setLogin(true) : setLogin(true);
            } catch (error) {
                setLogin(false);
            }
        } else {
            setLogin(false);
        }
    }, [])

    return login;
};

export default useAuthCheck;