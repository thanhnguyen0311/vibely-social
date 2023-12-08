import {useGoogleLogin} from "@react-oauth/google";
import {googleLogin, resetAccountState} from "~/features/userAccount/index.js";
import {useState, useRef, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import google from "~/assets/img/google-icon.png";
import { Toast } from 'primereact/toast';
import {
    selectLoginIsSuccess,
    selectUserData,
    selectAccountError
} from "~/features/userAccount/index.js";
import {useNavigate} from "react-router-dom";
import Popup from "reactjs-popup";


function GoogleLoginButton({type}) {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const user = useSelector(selectUserData);
    const success = useSelector(selectLoginIsSuccess);
    const [hasError, setHasError] = useState(false);

    const toast = useRef(null);

    const showError = () => {
        toast.current.show({severity:'error', summary: 'Error', detail:'Login with Google failed', life: 3000});
    }

    const handleGoogleLogin = useGoogleLogin({
        onSuccess: (response) => dispatch(googleLogin(response)),
        onNonOAuthError: (error) => {
            console.log("Non OAuth Error");
            console.log(error)
            showError()
        },
        onError: (error) => {
            console.log("Error")
            console.log(error)
            showError()
        }
    })

    useEffect(() => {
        if (success) {
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                console.log("Login success!");
                navigate("/");
            }
        }
        return () => {
            dispatch(resetAccountState());
        };
    }, [success, user]);


    let firstDivClass, secondDivClass, imageClass, buttonClass, spanClass;

    switch (type) {
        case "register":
            firstDivClass = "col-sm-12 p-0 mt-2";
            secondDivClass="form-group mb-1";
            imageClass="ms-3 mt-2 ms-3 w40 mb-1 me-5";
            buttonClass="w-100 font-xss d-flex style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2";
            spanClass="ms-4 justify-content-center";
            break;
        case "login":
            firstDivClass="col-sm-12 p-0 mt-2";
            secondDivClass="form-group mb-1";
            imageClass="ms-3 mt-2 ms-2 w40 mb-1 me-5";
            buttonClass="w-100 d-flex style2-input text-white fw-600 bg-facebook border-0 p-0 mb-2";
            spanClass="ms-3 justify-content-center";
            break;
    }

    return (
        <>
            <div className={firstDivClass}>
                <div className={secondDivClass}>
                    <button
                        className={buttonClass}
                        onClick={() => handleGoogleLogin()}>
                        <img
                            src={google}
                            alt="icon"
                            className={imageClass}
                        />
                        <span className={spanClass}>
                            Sign in with Google
                        </span>
                    </button>
                </div>
            </div>
            <Toast ref={toast} position="bottom-center"/>

        </>
    )
}

export default GoogleLoginButton;