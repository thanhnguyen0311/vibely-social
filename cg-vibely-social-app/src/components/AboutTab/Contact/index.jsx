import "~/pages/PersonalPage/index.css"
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useDispatch, useSelector} from "react-redux";
import {editUserInfo, setCity, setPhoneNumber} from "~/features/userInfo/UserInfoSlice";
import {getCities, selectCities, selectGetCitiesIsSuccess, setGetCitiesSuccess} from "~/features/getCities/index.js";
import {getStoredUserData} from "~/service/accountService.js";

function Contact() {
    const [phoneStatus, setPhoneStatus] = useState(false)
    const [cityStatus, setCityStatus] = useState(false)
    const userInfo = useSelector(state => state.userInfo);
    const currentUser = getStoredUserData();
    const dispatch = useDispatch();
    //TODO: will implement loading feature
    // const loading = useSelector(selectGetCitiesIsLoading)
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

    const formikPhone = useFormik({
        initialValues: {
            phone: userInfo.phoneNumber
        },

        enableReinitialize: true,

        validationSchema: Yup.object({
            phone: Yup
                .string()
                .required("You must fill in the Phone number section!")
                .matches(/^[0-9]{10}$/,
                    "Please enter a valid Phone number - (includes 10 numbers) !"),

        }),
        onSubmit: (values) => {
            const user = {
                ...userInfo,
                phoneNumber: values.phone
            }
            editUserInfo(user).then(() => {
                dispatch(setPhoneNumber(user))
                setPhoneStatus(!phoneStatus);
            })
        }
    })

    return (
        <>
            <div className="ps-5 pe-5 mb-4">
                <div>
                    <h4 className="fw-500">Phone number</h4>
                </div>
                {
                    phoneStatus === true ?
                        <form className="info-form" onSubmit={formikPhone.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-12 h75">
                                    <div className="form-group">

                                        <input type="text"
                                               className="form-control"
                                               id="phone"
                                               name="phone"
                                               value={formikPhone.values.phone}
                                               onChange={formikPhone.handleChange}
                                               onBlur={formikPhone.handleBlur}
                                               placeholder="Phone number"/>
                                        <span className="text-red">
                                        {formikPhone.errors.phone}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-12 border-bottom">
                                    <button type="submit"
                                            className={
                                                formikPhone.isValid ?
                                                    "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button"
                                                    : "text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-no-allowed text-grey-500"
                                            }>
                                        Save
                                    </button>
                                    <button onClick={() => {
                                        setPhoneStatus(false)
                                        formikPhone.resetForm()
                                    }}
                                            className="text-center mb-4 p-1 w75 border-0 float-right rounded-2 d-inline-block hover-button me-2">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>

                        : userInfo.phoneNumber != null ?
                            <div
                                className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                                <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                    <h4 className="d-flex align-items-center float-left">
                                        <i className="feather-phone me-2"></i>
                                        {userInfo.phoneNumber}
                                    </h4>
                                    {userInfo.id === currentUser.id ?
                                        <i onClick={() => setPhoneStatus(!phoneStatus)}
                                           className="ti-pencil d-flex font-md float-right cursor-pointer hover-edit">
                                        </i>
                                        : <></>
                                    }

                                </div>
                            </div>
                            : userInfo.id === currentUser.id ?

                                <div className="d-flex align-items-center mb-1 ">
                                    <i onClick={() => setPhoneStatus(true)}
                                       className="feather-plus-circle btn-round-sm text-dark font-lg cursor-pointer hover-edit">
                                    </i>
                                    <h4 onClick={() => setPhoneStatus(true)}
                                        className="fw-700 text-grey-500 font-xsss mt-2 hover-underline cursor-pointer">
                                        Add Mobile Phone number
                                    </h4>
                                </div>
                                :
                                <div
                                    className="fw-600 mb-1 row">
                                    <div className="mt-1 text-dark mb-1">
                                        <h4 className="d-flex align-items-center text-grey-500 float-left">
                                            <i className="feather-phone me-2"></i>
                                            No Phone number to show
                                        </h4>
                                    </div>
                                </div>
                }
            </div>

            <div className="ps-5 pe-5 mb-4">
                {
                    cityStatus === true ?
                        <form className="info-form" onSubmit={formikCity.handleSubmit}>
                            <div className="row">
                                <div className="col-lg-6 h100">
                                    <div>
                                        <h4 className="fw-500">City</h4>
                                    </div>
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
                                <div className="col-lg-6 h100">
                                    <div>
                                        <h4 className="fw-500">District</h4>
                                    </div>
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

                                <div className="col-lg-12 border-bottom mt-2">
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
                            <div>
                                <div>
                                    <h4 className="fw-500">City</h4>
                                </div>
                                <div
                                    className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                                    <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                                        <h4 className="d-flex align-items-center float-left">
                                            <i className="feather-home me-2"></i>
                                            {userInfo.city + ", " + userInfo.district}</h4>
                                        {userInfo.id === currentUser.id ?
                                            <i onClick={() => setCityStatus(!cityStatus)}
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
                                        <h4 className="fw-500">City</h4>
                                    </div>
                                    <div className="d-flex align-items-center mb-1 ">
                                        <i onClick={() => setCityStatus(true)}
                                           className="feather-plus-circle btn-round-sm text-dark font-lg cursor-pointer hover-edit">
                                        </i>
                                        <h4 onClick={() => setCityStatus(true)}
                                            className="fw-700 text-grey-500 font-xsss mt-2 hover-underline cursor-pointer">
                                            Add current City
                                        </h4>
                                    </div>
                                </div>
                                :
                                <div>
                                    <div>
                                        <h4 className="fw-500">City</h4>
                                    </div>
                                    <div
                                        className="fw-600 mb-1 row">
                                        <div className="mt-1 text-dark mb-1">
                                            <h4 className="d-flex align-items-center text-grey-500 float-left">
                                                <i className="feather-home me-2"></i>
                                                No City to show
                                            </h4>
                                        </div>
                                    </div>
                                </div>

                }
            </div>

            <div className="ps-5 mb-4 pe-5">
                <div>
                    <h4 className="fw-500">Email</h4>
                </div>
                <div
                    className="fw-600 text-dark lh-26 font-xssss mb-1 row">
                    <div className="mt-1 align-items-center text-dark lh-26 mb-1 col-lg-12">
                        <h4 className="d-flex align-items-center float-left">
                            <i className="feather-mail me-2"></i>
                            {userInfo.email}</h4>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Contact;