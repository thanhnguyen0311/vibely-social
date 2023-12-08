import {refreshTokenApi} from "~/api/accountApi.js";
import {useEffect, useRef} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setUser} from "~/features/userAccount/index.js";

export const useAuthorizeUser = () => {
    let storedUser = useRef()
    storedUser.current = JSON.parse(localStorage.getItem('user'))
    const navigate = useNavigate();
    const lastAuthentication = localStorage.getItem('lastAuth')
    const dispatch = useDispatch()

    useEffect(() => {
        let refreshToken;
        if (!storedUser.current) {
            navigate("/login")
        } else {
            refreshToken = storedUser.current.refreshToken
            const now = (new Date())/1000
            const authIdle = now - lastAuthentication
            if (authIdle > 1800 || !storedUser.current?.accessToken){
                const response =  refreshTokenApi(refreshToken)
                response
                    .then(response => response.data)
                    .then(data => {
                        storedUser.current.accessToken = data;
                        localStorage.setItem('user', JSON.stringify(storedUser.current))
                        localStorage.setItem('lastAuth','' + now)
                    })
                    .catch(reason => {
                        console.log('reason')
                        console.log(reason)
                        navigate("/login")
                    })
            }
            dispatch(setUser(storedUser.current))
        }

    }, [])
}