import { GoogleOAuthProvider } from "@react-oauth/google";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { CLIENT_ID } from "~/app/constants.js";
import logo from "~/assets/img/logo.svg";
import GoogleLoginButton from "~/components/GoogleLoginButton/index.jsx";
import {
    loginToAccount,
    resetAccountState,
    selectAccountError,
    selectLoginIsSuccess,
    selectUserAccountSliceIsLoading,
    selectUserData,
} from "~/features/userAccount/index.js";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectUserData);
    const success = useSelector(selectLoginIsSuccess);
    const loading = useSelector(selectUserAccountSliceIsLoading);
    const error = useSelector(selectAccountError);
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const handleLogin = (values) => {
        const email = values.email;
        const password = values.password;
        dispatch(loginToAccount({email, password}));
    };

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

    useEffect(() => {
        if (error) {
            setErrorMessage("Wrong email or password!");
        }
    }, [loading]);

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required(),
            password: Yup.string().required(),
        }),
        onSubmit: (values) => handleLogin(values),
    });

    let isInvalidEmail = formik.touched.email && formik.errors.email;
    let isInvalidPassword = formik.touched.password && formik.errors.password;

    return (
        <div className="main-wrap">
            <div className="nav-header bg-transparent shadow-none border-0">
                <div className="nav-top w-100">
          <span href="default.html">
            <i className="text-success display1-size me-2 ms-0">
              <img
                  src={logo}
                  alt="icon"
                  style={{maxWidth: 50, zIndex: "10000"}}
              />
            </i>
            <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
              Vibely Social
            </span>
          </span>
                    <a href="#" className="mob-menu ms-auto me-2 chat-active-btn">
                        <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>
                    </a>
                    <a href="#" className="mob-menu me-2">
                        <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
                    </a>
                    <a href="#" className="me-2 menu-search-icon mob-menu">
                        <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
                    </a>
                    <button className="nav-menu me-0 ms-2"></button>
                    <span
                        className="header-btn d-none d-lg-block bg-dark fw-500 text-white font-xsss p-3 ms-auto w100 text-center lh-20 rounded-xl">
            Login
          </span>
                    <Link
                        to="/register"
                        className="header-btn d-none d-lg-block bg-blue-gradiant fw-500 text-white font-xsss p-3 ms-2 w100 text-center lh-20 rounded-xl"
                    >
                        Register
                    </Link>
                </div>
            </div>
            <div className="row">
                <div
                    className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
                    style={{backgroundImage: 'url("via.placeholder.com/800x950.png")'}}
                ></div>
                <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
                    <div className="card shadow-none border-0 ms-auto me-auto login-card">
                        <div className="card-body rounded-0 text-left">
                            <h2 className="fw-700 display1-size display2-md-size mb-3">
                                Login into your account
                            </h2>
                            <Form className="infoform" onSubmit={formik.handleSubmit}>
                                <OverlayTrigger
                                    placement="left"
                                    show={isInvalidEmail ? true : false}
                                    overlay={
                                        <Tooltip id="tooltip-left">{formik.errors.email}</Tooltip>
                                    }>
                                    <div className="form-group icon-input mb-3">
                                        <i className="font-sm ti-email text-grey-500 pe-0"></i>
                                        <input
                                            type="text"
                                            id="email"
                                            name="email"
                                            className={
                                                isInvalidEmail
                                                    ? "style2-input ps-5 form-control is-invalid text-grey-900 font-xsss fw-600"
                                                    : "style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                            }
                                            placeholder="Your Email Address"
                                            onBlur={formik.handleBlur}
                                            onChange={formik.handleChange}
                                        />
                                    </div>
                                </OverlayTrigger>

                                <OverlayTrigger
                                    placement="left"
                                    show={isInvalidPassword ? true : false}
                                    overlay={
                                        <Tooltip id="tooltip-left">
                                            {formik.errors.password}
                                        </Tooltip>
                                    }
                                >
                                    <div className="form-group icon-eye-input-log mb-1">
                                        <div className="icon-eye-input-log">
                                            <i
                                                className={
                                                    isPasswordVisible
                                                        ? "font-sm feather-eye text-grey-500 pe-0"
                                                        : "font-sm feather-eye-off text-grey-500 pe-0"
                                                }
                                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                                            ></i>
                                            <input
                                                type={isPasswordVisible ? "text" : "password"}
                                                id="password"
                                                name="password"
                                                className={
                                                    isInvalidPassword
                                                        ? "style2-input ps-5 form-control is-invalid text-grey-900 font-xsss fw-600"
                                                        : "style2-input ps-5 form-control text-grey-900 font-xsss fw-600"
                                                }
                                                placeholder="Password"
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />
                                            <i
                                                className="font-sm ti-lock text-grey-500 pe-0"
                                                style={{left: "15px"}}
                                            ></i>
                                        </div>
                                        <div>
                                            <small className="text-danger ms-2">
                                                {errorMessage}{" "}
                                            </small>
                                        </div>
                                    </div>
                                </OverlayTrigger>

                                <div className="form-check text-left mb-3">
                                    <input
                                        type="checkbox"
                                        className="form-check-input mt-2"
                                        id="exampleCheck1"
                                    />
                                    <label
                                        className="form-check-label font-xsss text-grey-500"
                                        htmlFor="exampleCheck1"
                                    >
                                        Remember me
                                    </label>
                                    <Link
                                        to="/forgot"
                                        className="fw-600 font-xsss text-grey-700 mt-1 float-right"
                                    >
                                        Forgot your Password?
                                    </Link>
                                </div>
                                <div className="col-sm-12 p-0 text-left">
                                    <div className="form-group mb-1">
                                        <button
                                            type="submit"
                                            className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                                        >
                                            Login
                                        </button>
                                    </div>
                                    <h6 className="text-grey-500 font-xsss fw-500 mt-0 mb-0 lh-32">
                                        Dont have account ?
                                        <Link
                                            to="/register"
                                            className="fw-700 ms-1 text-blue-gradiant"
                                        >
                                            Register{" "}
                                        </Link>
                                        Or, Sign in with your social account
                                    </h6>
                                </div>
                            </Form>
                            <GoogleOAuthProvider clientId={CLIENT_ID}>
                                <GoogleLoginButton
                                    type="login"
                                />
                            </GoogleOAuthProvider>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
