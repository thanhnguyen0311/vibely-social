import "~/pages/PersonalPage/index.css"
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {
    editUserInfo,
    formatDate,
    setBirthday,
    setCity,
    setSchool,
    setWork
} from "~/features/userInfo/UserInfoSlice";
import {getCities, selectCities, selectGetCitiesIsSuccess, setGetCitiesSuccess} from "~/features/getCities/index.js";
import {getStoredUserData} from "~/service/accountService.js";

function OverView() {
    const [workStatus, setWorkStatus] = useState(false)
    const [schoolStatus, setSchoolStatus] = useState(false)
    const [cityStatus, setCityStatus] = useState(false)
    const [birthdayStatus, setBirthdayStatus] = useState(false)
    const userInfo = useSelector(state => state.userInfo);
    const currentUser = getStoredUserData();
    const dispatch = useDispatch();
    const cityList = useSelector(selectCities);
    const success = useSelector(selectGetCitiesIsSuccess);
    const [cities, setCities] = useState([]);

    useEffect(() => {
        if (!success) {
            dispatch(getCities());
            console.log('Loading city list');
        } else {
            setCities(cityList);
        }
        return () => {
            if (success) {
                dispatch(setGetCitiesSuccess(false));
            }
        }
    }, [success]);


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

    const formikCity = useFormik({
        initialValues: {
            city: userInfo.city,
            district: userInfo.district
        },
        enableReinitialize: true,

        validationSchema: Yup.object({
            city: Yup
                .string()
                .required("You must fill in the City section!"),
            district: Yup
                .string()
                .required("You must fill in the District section!"),
        }),
        onSubmit: (values) => {
            const user = {
                ...userInfo,
                city: values.city,
                district: values.district
            }
            editUserInfo(user).then(() => {
                dispatch(setCity(user))
                setCityStatus(!cityStatus);
            })
        }
    });

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
            <div className="ps-5 pe-5 mb-3">
                {
                    workStatus === true ?
                        <form className="info-form" onSubmit={formikWork.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 h75">
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
                                <div className="col-lg-12 h75">
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
                                <div className="col-lg-12 border-bottom">
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
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        : userInfo.company != null ?
                            <div>
                                <div
                                    className="fw-600 mb-1 row">
                                    <div className="mt-1 text-dark mb-1">
                                        <h4 className="d-flex align-items-center float-left">
                                            <i className="feather-briefcase me-2"></i>
                                            Work at {userInfo.company} as {userInfo.position}
                                        </h4>
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
                                <div
                                    className="fw-600 mb-1 row">
                                    <div className="mt-1 text-dark mb-1">
                                        <h4 className="d-flex align-items-center text-grey-500 float-left">
                                            <i className="feather-briefcase me-2"></i>
                                            No Workplace to show
                                        </h4>
                                    </div>
                                </div>
                }
            </div>

            <div className="ps-5 pe-5 mb-3">
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
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>

                        : userInfo.school != null ?
                            <div
                                className="fw-600 mb-1 row">
                                <div className="mt-1 text-dark mb-1">
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="ti-ruler-pencil me-2"></i>
                                        Study at {userInfo.school}</h4>
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

            <div className="ps-5 pe-5 mb-3">
                {
                    cityStatus === true ?
                        <form className="info-form" onSubmit={formikCity.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 h75">
                                    <select
                                        id="city"
                                        name="city"
                                        value={formikCity.values.city}
                                        onChange={formikCity.handleChange}
                                        onBlur={() => {
                                            formikCity.handleBlur;
                                            formikCity.values.district = ""
                                        }}
                                        className="form-select-md form-gender cursor-pointer">
                                        <option className="font-xsss"
                                                value="">Select City
                                        </option>
                                        {cities.map(city => {
                                            if (city) {
                                                return <option key={city.code} className="font-xsss"
                                                               value={city.name}>{city.name}</option>
                                            }
                                        })}
                                    </select>
                                    <span className="text-red">
                                        {formikCity.errors.city}
                                    </span>
                                </div>
                                <div className="col-lg-12 h75">
                                    <select
                                        id="district"
                                        name="district"
                                        value={formikCity.values.district}
                                        onChange={formikCity.handleChange}
                                        onBlur={formikCity.handleBlur}
                                        className="form-select-md form-gender cursor-pointer">
                                        <option className="font-xsss"
                                                value="">Select District
                                        </option>
                                        {cities.map(city => {
                                            if (city.name === formikCity.values.city) {
                                                return city.districts.map(district => {
                                                        return <option key={district.code} className="font-xsss"
                                                                       value={district.name}>{district.name}</option>
                                                    }
                                                )
                                            }
                                        })}
                                    </select>
                                    <span className="text-red">
                                        {formikCity.errors.district}
                                    </span>
                                </div>
                                <div className="col-lg-12 border-bottom">
                                    <button type="submit"
                                            className={
                                                formikCity.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setCityStatus(false)
                                        formikCity.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                        : userInfo.city != null ?
                            <div
                                className="fw-600 mb-1 row">
                                <div className="mt-1 text-dark mb-1">
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="feather-home me-2"></i>
                                        Lives in {userInfo.city + ", " + userInfo.district}
                                    </h4>
                                    {userInfo.id === currentUser.id ?
                                        <i onClick={() => setCityStatus(!cityStatus)}
                                           className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                        </i>
                                        : <></>
                                    }
                                </div>
                            </div>
                            : userInfo.id === currentUser.id ?

                                <div className="d-flex align-items-center mb-1 ">
                                    <i onClick={() => setCityStatus(true)}
                                       className="feather-plus-circle btn-round-sm text-dark font-lg cursor-pointer hover-edit">
                                    </i>
                                    <h4 onClick={() => setCityStatus(true)}
                                        className="fw-700 text-grey-500 font-xsss mt-2 hover-underline cursor-pointer">
                                        Add current City
                                    </h4>
                                </div>
                                :
                                <div
                                    className="fw-600 mb-1 row">
                                    <div className="mt-1 text-dark mb-1">
                                        <h4 className="d-flex align-items-center text-grey-500 float-left">
                                            <i className="ti-ruler-pencil me-2"></i>
                                            No City to show
                                        </h4>
                                    </div>
                                </div>
                }
            </div>

            <div className="ps-5 pe-5 mb-3">
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
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
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
                            className="fw-600 row">
                            <div className="mt-2 align-items-center text-dark lh-26 col-lg-12">
                                {userInfo.birthday && (
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="ti-thought me-2"></i>
                                        Born on {formatDate(userInfo.birthday)}
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

export default OverView;