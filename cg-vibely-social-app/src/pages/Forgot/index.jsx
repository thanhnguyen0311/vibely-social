import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import logo from "~/assets/img/logo.svg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCheckEmailForgotError,
  selectCheckEmailForgotSuccess,
  selectUserData,
  checkEmailForgot,
  setCheckEmailForgotSuccess,
} from "~/features/userAccount/index.js";
import { Slide, ToastContainer, toast } from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

function Forgot() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUserData);
  const success = useSelector(selectCheckEmailForgotSuccess);
  const error = useSelector(selectCheckEmailForgotError);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (value) => {
    const email = value.email;
    dispatch(checkEmailForgot(email));
  };

  useEffect(() => {
    if (success) {
      toast.success("Đã gửi email thành công!", { closeOnClick: true });
      dispatch(setCheckEmailForgotSuccess(false));
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      setErrorMessage("Wrong email!");
      toast.error("Wrong email!", { closeOnClick: true });
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().required(),
    }),
    onSubmit: (value) => handleLogin(value),
  });

  let isInvalidEmail = formik.touched.email && formik.errors.email;

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        className="custom-toast-container"
        toastClassName="custom-toast"
      />
      <div className="main-wrap">
        <div className="nav-header bg-transparent shadow-none border-0">
          <div className="nav-top w-100">
            <span href="default.html">
              <i className="text-success display1-size me-2 ms-0">
                <img
                  src={logo}
                  alt="icon"
                  style={{ maxWidth: 50, zIndex: "10000" }}
                />
              </i>
              <span className="d-inline-block fredoka-font ls-3 fw-600 text-current font-xxl logo-text mb-0">
                Vibely Social
              </span>
            </span>
            <a href="#" className="mob-menu ms-auto me-2 chat-active-btn">
              <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>
            </a>
            <a href="default-video.html" className="mob-menu me-2">
              <i className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i>
            </a>
            <a href="#" className="me-2 menu-search-icon mob-menu">
              <i className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i>
            </a>
          </div>
        </div>
        <div className="row">
          <div
            className="col-xl-5 d-none d-xl-block p-0 vh-100 bg-image-cover bg-no-repeat"
            style={{
              backgroundImage: 'url("via.placeholder.com/800x950.png")',
            }}
          ></div>
          <div className="col-xl-7 vh-100 align-items-center d-flex bg-white rounded-3 overflow-hidden">
            <div className="card shadow-none border-0 ms-auto me-auto login-card">
              <div className="card-body rounded-0 text-left">
                <h4 className="fw-700 font-md display2-md-size mb-3">
                  Please enter your email to recover your account
                </h4>
                <Form className="infoform" onSubmit={formik.handleSubmit}>
                  <OverlayTrigger
                    placement="left"
                    show={isInvalidEmail ? true : false}
                    overlay={
                      <Tooltip id="tooltip-left">{formik.errors.email}</Tooltip>
                    }
                  >
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

                  <div className="form-check text-left mb-3"></div>
                  <div className="col-sm-12 p-0 text-left">
                    <div className="form-group mb-1">
                      <button
                        type="submit"
                        className="form-control text-center style2-input text-white fw-600 bg-dark border-0 p-0 "
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                  <div className="col-sm-12 p-0 mt-2">
                    <div className="form-group mb-1 "></div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
