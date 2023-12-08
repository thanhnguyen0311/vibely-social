import "~/pages/PersonalPage/index.css"
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    editUserInfo,
    formatDate,
    setBirthday,
    setFullName,
    setGender
} from "~/features/userInfo/UserInfoSlice";
import {getStoredUserData} from "~/service/accountService.js";

function UserDetail() {
    const [nameStatus, setNameStatus] = useState(false)
    const [genderStatus, setGenderStatus] = useState(false)
    const [birthdayStatus, setBirthdayStatus] = useState(false)
    const userInfo = useSelector(state => state.userInfo);
    const currentUser = getStoredUserData();
    const dispatch = useDispatch();


    const formikName = useFormik({
        initialValues: {
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
        },
        enableReinitialize: true,

        validationSchema: Yup.object({
            firstName: Yup
                .string()
                .required("You must fill in the first Name section!"),
            lastName: Yup
                .string()
                .required("You must fill in the last Name section!"),
        }),
        onSubmit: (values) => {
            const user = {
                ...userInfo,
                firstName: values.firstName,
                lastName: values.lastName
            }
            editUserInfo(user).then(() => {
                dispatch(setFullName(user))
                setNameStatus(!nameStatus);
            })
        }
    })
    const formikGender = useFormik({
        initialValues: {
            gender: userInfo.gender,
        },

        enableReinitialize: true,

        validationSchema: Yup.object({
            gender: Yup
                .string()
                .required("You must to select your gender!")
        }),
        onSubmit: async (values) => {
            const user = {
                ...userInfo,
                gender: values.gender
            }
            editUserInfo(user).then(() => {
                dispatch(setGender(user))
                setGenderStatus(!genderStatus);
            })
        }
    })
    const formikBirthday = useFormik({
        initialValues: {
            birthday: userInfo.birthday,
        },

        enableReinitialize: true,

        validationSchema: Yup.object({
            birthday: Yup
                .string()
                .required("You must fill in the Birthday section!")
        }),
        onSubmit: async (values) => {
            const user = {
                ...userInfo,
                birthday: values.birthday
            }
            editUserInfo(user).then(() => {
                dispatch(setBirthday(user))
                setBirthdayStatus(!birthdayStatus);
            })
        }
    })

    return (
        <>
            <div className="ps-5 mb-4 pe-5">
                {
                    nameStatus === true ?
                        <form className="info-form" onSubmit={formikName.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 h100">
                                    <div>
                                        <h4 className="fw-500">Last Name</h4>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control"
                                               id="lastName"
                                               name="lastName"
                                               value={formikName.values.lastName}
                                               onChange={formikName.handleChange}
                                               onBlur={formikName.handleBlur}/>
                                        <span className="text-red">
                                        {formikName.errors.lastName}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-6 h100">
                                    <div>
                                        <h4 className="fw-500">First Name</h4>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control"
                                               id="firstName"
                                               name="firstName"
                                               value={formikName.values.firstName}
                                               onChange={formikName.handleChange}
                                               onBlur={formikName.handleBlur}/>
                                        <span className="text-red">
                                        {formikName.errors.firstName}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 border-bottom">
                                    <button type="submit"
                                            className={
                                                formikName.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setNameStatus(!nameStatus)
                                        formikName.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        :
                        <div>
                            <div>
                                <h4 className="fw-500">Full Name</h4>
                            </div>
                            <div
                                className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                                <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="feather-airplay me-2"></i>
                                        {userInfo.lastName + ' ' + userInfo.firstName}</h4>
                                    {userInfo.id === currentUser.id ?
                                        <i onClick={() => setNameStatus(true)}
                                           className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                        </i>
                                        : <></>
                                    }

                                </div>
                            </div>
                        </div>
                }
            </div>

            <div className="ps-5 pe-5 mb-4">
                <div>
                    <h4 className="fw-500">Gender</h4>
                </div>
                {
                    genderStatus === true ?
                        <form className="info-form" onSubmit={formikGender.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 h75 mt-1">
                                    <select
                                        id="gender"
                                        name="gender"
                                        value={formikGender.values.gender}
                                        onChange={formikGender.handleChange}
                                        onBlur={formikGender.handleBlur}
                                        className="form-select-md form-gender cursor-pointer">
                                        <option className="font-xsss"
                                                value="">Select Gender
                                        </option>
                                        <option className="font-xsss" value="MALE">MALE</option>
                                        <option className="font-xsss" value="FEMALE">FEMALE</option>
                                        <option className="font-xsss" value="OPTIONAL">OPTIONAL</option>
                                    </select>
                                    <span className="text-red">
                                        {formikGender.errors.gender}
                                        </span>
                                </div>
                                <div className="col-lg-12 border-bottom">
                                    <button type="submit"
                                            className={
                                                formikGender.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setGenderStatus(false)
                                        formikGender.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        : <div
                            className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                            <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                <h4 className="d-flex align-items-center float-left">
                                    <i className="feather-users me-2"></i>
                                    {userInfo.gender}
                                </h4>
                                {userInfo.id === currentUser.id ?
                                    <i onClick={() => setGenderStatus(!genderStatus)}
                                       className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                    </i>
                                    : <></>
                                }
                            </div>
                        </div>
                }
            </div>

            <div className="ps-5 mb-4 pe-5">
                <div>
                    <h4 className="fw-500">Birthday</h4>
                </div>
                {
                    birthdayStatus === true ?
                        <form className="info-form" onSubmit={formikBirthday.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 h75">
                                    <div className="form-group">

                                        <input type="date"
                                               min="1900-01-01"
                                               max="2023-12-31"
                                               className="form-control"
                                               id="birthday"
                                               name="birthday"
                                               value={formikBirthday.values.birthday}
                                               onChange={formikBirthday.handleChange}
                                               onBlur={formikBirthday.handleBlur}
                                               placeholder="Birthday address"/>
                                        <span className="text-red">
                                        {formikBirthday.errors.birthday}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 border-bottom">
                                    <button type="submit"
                                            className={
                                                formikBirthday.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"}>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setBirthdayStatus(false)
                                        formikBirthday.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        : <div
                            className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                            <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                {userInfo.birthday && (
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="ti-thought me-2"></i>
                                        Birthday: {formatDate(userInfo.birthday)}
                                    </h4>
                                )}
                                {userInfo.id === currentUser.id ?
                                    <i onClick={() => setBirthdayStatus(!birthdayStatus)}
                                       className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                    </i>
                                    : <></>
                                }

                            </div>
                        </div>
                }
            </div>

        </>
    )
}

export default UserDetail;