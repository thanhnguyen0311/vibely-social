import "~/pages/PersonalPage/index.css"
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {editUserInfo, setSchool, setWork} from "~/features/userInfo/userInfoSlice.js";
import {getStoredUserData} from "~/service/accountService.js";

function WorkAndEducation() {
    const [workStatus, setWorkStatus] = useState(false)
    const [schoolStatus, setSchoolStatus] = useState(false)
    const userInfo = useSelector(state => state.userInfo);
    const dispatch = useDispatch();
    const currentUser = getStoredUserData();

    const formikWork = useFormik({
        initialValues: {
            company: userInfo.company,
            position: userInfo.position,
        },
        enableReinitialize: true,

        validationSchema: Yup.object({
            company: Yup
                .string()
                .required("You must fill in the first Name section!"),
            position: Yup
                .string()
                .required("You must fill in the last Name section!"),
        }),
        onSubmit: (values) => {
            const user = {
                ...userInfo,
                company: values.company,
                position: values.position
            }
            editUserInfo(user).then(() => {
                dispatch(setWork(user))
                setWorkStatus(!workStatus);
            })
        }
    })

    const formikSchool = useFormik({
        initialValues: {
            school: userInfo.school
        },

        enableReinitialize: true,

        validationSchema: Yup.object({
            school: Yup
                .string()
                .required("You must fill in the School number section!")

        }),
        onSubmit: (values) => {
            const user = {
                ...userInfo,
                school: values.school
            }
            editUserInfo(user).then(() => {
                dispatch(setSchool(user))
                setSchoolStatus(!schoolStatus);
            })
        }
    })

    return (
        <>
            <div className="ps-5 mb-4 pe-5">
                {
                    workStatus === true ?
                        <form className="info-form" onSubmit={formikWork.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 h100">
                                    <div>
                                        <h4 className="fw-500">Company</h4>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control"
                                               id="company"
                                               name="company"
                                               value={formikWork.values.company}
                                               onChange={formikWork.handleChange}
                                               onBlur={formikWork.handleBlur}
                                               placeholder="Company"/>
                                        <span className="text-red">
                                        {formikWork.errors.company}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-6 h100">
                                    <div>
                                        <h4 className="fw-500">Position</h4>
                                    </div>
                                    <div className="form-group">
                                        <input type="text"
                                               className="form-control"
                                               id="position"
                                               name="position"
                                               value={formikWork.values.position}
                                               onChange={formikWork.handleChange}
                                               onBlur={formikWork.handleBlur}
                                               placeholder="Position"/>
                                        <span className="text-red">
                                        {formikWork.errors.position}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 border-bottom mt-2">
                                    <button type="submit"
                                            className={
                                                formikWork.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setWorkStatus(false)
                                        formikWork.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Canel
                                    </button>
                                </div>
                            </div>
                        </form>
                        : userInfo.company != null ?
                            <div>
                                <div>
                                    <h4 className="fw-500">Work</h4>
                                </div>
                                <div
                                    className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                                    <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                        <h4 className="d-flex align-items-center float-left">
                                            <i className="feather-briefcase me-2"></i>
                                            {userInfo.position + " in " + userInfo.company}</h4>
                                        {userInfo.id === currentUser.id ?
                                            <i onClick={() => setWorkStatus(!workStatus)}
                                               className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                            </i>
                                            : <></>
                                        }

                                    </div>
                                </div>
                            </div>

                            : userInfo.id === currentUser.id ?

                                <div>
                                    <div>
                                        <h4 className="fw-500">Work</h4>
                                    </div>
                                    <div className="d-flex align-items-center mb-1 ">
                                        <i onClick={() => setWorkStatus(true)}
                                           className="feather-plus-circle text-dark btn-round-sm font-lg cursor-pointer hover-edit">
                                        </i>
                                        <h4 onClick={() => setWorkStatus(true)}
                                            className="fw-700 text-grey-500 font-xsss mt-2 hover-underline cursor-pointer">
                                            Add current Workplace
                                        </h4>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div>
                                        <h4 className="fw-500">Work</h4>
                                    </div>
                                    <div
                                        className="fw-600 mb-1 row">
                                        <div className="mt-1 text-dark mb-1">
                                            <h4 className="d-flex align-items-center text-grey-500 float-left">
                                                <i className="feather-briefcase me-2"></i>
                                                No Workplace to show
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                }
            </div>

            <div className="ps-5 mb-4 pe-5">
                <div>
                    <h4 className="fw-500">School</h4>
                </div>
                {
                    schoolStatus === true ?
                        <form className="info-form" onSubmit={formikSchool.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 h75">
                                    <div className="form-group">

                                        <input type="text"
                                               className="form-control"
                                               id="school"
                                               name="school"
                                               value={formikSchool.values.school}
                                               onChange={formikSchool.handleChange}
                                               onBlur={formikSchool.handleBlur}
                                               placeholder="School"/>
                                        <span className="text-red">
                                        {formikSchool.errors.school}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 border-bottom">
                                    <button type="submit"
                                            className={
                                                formikSchool.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setSchoolStatus(false)
                                        formikSchool.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Canel
                                    </button>
                                </div>
                            </div>
                        </form>
                        : userInfo.school != null ?
                            <div
                                className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                                <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="ti-ruler-pencil me-2"></i>
                                        {userInfo.school}</h4>
                                    {userInfo.id === currentUser.id ?
                                        <i onClick={() => setSchoolStatus(!schoolStatus)}
                                           className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                        </i>
                                        : <></>
                                    }

                                </div>
                            </div>
                            : userInfo.id === currentUser.id ?

                                <div className="d-flex align-items-center mb-1 ">
                                    <i onClick={() => setSchoolStatus(true)}
                                       className="feather-plus-circle btn-round-sm text-dark font-lg cursor-pointer hover-edit">
                                    </i>
                                    <h4 onClick={() => setSchoolStatus(true)}
                                        className="fw-700 text-grey-500 font-xsss mt-2 hover-underline cursor-pointer">
                                        Add School
                                    </h4>
                                </div>
                                :
                                <div
                                    className="fw-600 mb-1 row">
                                    <div className="mt-1 text-dark mb-1">
                                        <h4 className="d-flex align-items-center text-grey-500 float-left">
                                            <i className="ti-ruler-pencil me-2"></i>
                                            No School to show
                                        </h4>
                                    </div>
                                </div>
                }
            </div>
        </>
    )
}

export default WorkAndEducation;