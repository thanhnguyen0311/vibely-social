import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {editUserInfo, formatDate, setBio, setHobbies} from "~/features/userInfo/userInfoSlice.js";
import {useFormik} from "formik";
import {getStoredUserData} from "~/service/accountService.js";

function Intro({toggle}) {
    const [bioStatus, setBioStatus] = useState(false);
    const [hobbyStatus, setHobbyStatus] = useState(false);
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userInfo);
    const user = getStoredUserData();

    const getHobbies = () => {
        if (userInfo.hobbies != null) {
            return userInfo.hobbies.split(',');
        } else {
            return ['', '', '', '', '', ''];
        }
    }

    const formikBio = useFormik({
        initialValues: {
            bio: userInfo.bio
        },

        enableReinitialize: true,

        onSubmit: (values) => {
            const user = {
                ...userInfo,
                bio: values.bio
            }
            editUserInfo(user).then(() => {
                dispatch(setBio(user))
                setBioStatus(!bioStatus);
            })
        }
    })

    const formikHobby = useFormik({
        initialValues: {
            hobby1: getHobbies()[0],
            hobby2: getHobbies()[1],
            hobby3: getHobbies()[2],
            hobby4: getHobbies()[3],
            hobby5: getHobbies()[4],
            hobby6: getHobbies()[5]
        },

        enableReinitialize: true,

        onSubmit: (values) => {
            const user = {
                ...userInfo,
                hobbies:
                    values.hobby1 + ',' +
                    values.hobby2 + ',' +
                    values.hobby3 + ',' +
                    values.hobby4 + ',' +
                    values.hobby5 + ',' +
                    values.hobby6
            }
            editUserInfo(user).then(() => {
                dispatch(setHobbies(user))
                setHobbyStatus(!hobbyStatus)
            })
        }
    })


    return (<>
        <div className="card w-100 shadow-xss rounded-xxl border-0">
            <div className="card-body d-block p-4">
                <h2 className="fw-700 mb-0 mt-0 font-md text-grey-900">Intro</h2>
            </div>

            <div className="card-body ps-4 pe-4">
                {bioStatus === true ?
                    <div>
                        <textarea
                            name="bio" id="bio"
                            cols="40" rows="3"
                            form="bio-form"
                            value={formikBio.values.bio}
                            onChange={formikBio.handleChange}
                            onBlur={formikBio.handleBlur}
                            placeholder="Write something for us !!!"
                            className="rounded-3 border-primary text-center">
                        </textarea>

                        <form id="bio-form" className="" onSubmit={formikBio.handleSubmit}>
                            <button type="submit"
                                    className="text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button">
                                OK
                            </button>
                        </form>
                    </div>

                    :
                    <div>
                        <h6 className="font-xss mb-3 text-center pb-3">
                            {formikBio.values.bio}
                        </h6>
                        {
                            userInfo.id === user.id ?
                                <span
                                    onClick={() => setBioStatus(!bioStatus)}
                                    className="
                                    cursor-pointer hover-opacity p-1 fw-600 text-center d-block
                                    font-xss text-grey-800 bg-primary-gradiant rounded-3 ps-2">
                                    Edit bio
                                </span>
                                : <div className="border-bottom"></div>
                        }

                    </div>
                }
            </div>

            <div className="card-body ps-4 pe-4">
                {userInfo.company != null ? <div className="ms-1 pb-2">
                    <h4 className="d-flex align-items-center">
                        <i className="feather-briefcase me-2"></i>
                        Work at {userInfo.company} as {userInfo.position}
                    </h4>
                </div> : null}

                {userInfo.city != null ? <div className="ms-1 pb-2">
                    <h4 className="d-flex align-items-center">
                        <i className="feather-home me-2"></i>
                        Lives in {userInfo.city + ", " + userInfo.district}
                    </h4>
                </div> : null}
                {userInfo.birthday && (
                    <div className="ms-1 pb-2">
                        <h4 className="d-flex align-items-center">
                            <i className="feather-calendar me-2"></i>
                            Birth day {formatDate(userInfo.birthday)}
                        </h4>
                    </div>
                )}
                {
                    userInfo.id === user.id ?
                        <span
                            onClick={toggle}
                            className="cursor-pointer hover-opacity p-1 fw-600 text-center d-block font-xss text-grey-800 bg-primary-gradiant rounded-3 ps-2">
                        Edit details
                        </span>
                        : <div className="border-bottom mt-3"></div>
                }


            </div>

            <div className="card-body ps-4 pe-4">
                <div>
                    {
                        hobbyStatus === true ?
                            <form className="" onSubmit={formikHobby.handleSubmit}>
                                <input type="checkbox"
                                       className="btn-check"
                                       id="hobby1"
                                       name="hobby1"
                                       onChange={formikHobby.handleChange}
                                       checked={formikHobby.values.hobby1 != ''}
                                       value="Cooking"
                                       autoComplete="off"/>
                                <label className="btn font-xss btn-outline-success me-2 mb-2" htmlFor="hobby1">
                                    Cooking
                                </label>

                                <input type="checkbox"
                                       className="btn-check"
                                       id="hobby2"
                                       name="hobby2"
                                       onChange={formikHobby.handleChange}
                                       checked={formikHobby.values.hobby2 != ''}
                                       value="Play Game"
                                       autoComplete="off"/>
                                <label className="btn font-xss btn-outline-danger me-2 mb-2" htmlFor="hobby2">
                                    Play Game
                                </label>

                                <input type="checkbox"
                                       className="btn-check"
                                       id="hobby3"
                                       name="hobby3"
                                       onChange={formikHobby.handleChange}
                                       checked={formikHobby.values.hobby3 != ''}
                                       value="Listen Music"
                                       autoComplete="off"/>
                                <label className="btn font-xss btn-outline-warning me-2 mb-2" htmlFor="hobby3">
                                    Listen Music
                                </label>

                                <input type="checkbox"
                                       className="btn-check"
                                       id="hobby4"
                                       name="hobby4"
                                       onChange={formikHobby.handleChange}
                                       checked={formikHobby.values.hobby4 != ''}
                                       value="Traveling"
                                       autoComplete="off"/>
                                <label className="btn font-xss btn-outline-secondary me-2 mb-2" htmlFor="hobby4">
                                    Traveling
                                </label>

                                <input type="checkbox"
                                       className="btn-check"
                                       id="hobby5"
                                       name="hobby5"
                                       onChange={formikHobby.handleChange}
                                       checked={formikHobby.values.hobby5 != ''}
                                       value="Reading Book"
                                       autoComplete="off"/>
                                <label className="btn font-xss btn-outline-info me-2 mb-2" htmlFor="hobby5">
                                    Reading Book
                                </label>

                                <input type="checkbox"
                                       className="btn-check"
                                       id="hobby6"
                                       name="hobby6"
                                       onChange={formikHobby.handleChange}
                                       checked={formikHobby.values.hobby6 != ''}
                                       value="Take-care Pet"
                                       autoComplete="off"/>
                                <label className="btn font-xss btn-outline-dark me-2 mb-2" htmlFor="hobby6">
                                    Take-care Pet
                                </label>

                                <div>
                                    <button
                                        type="submit"
                                        className="text-center p-1 w50 border-0 float-right rounded-2 d-inline-block hover-button">
                                        OK
                                        {console.log(formikHobby.values)}
                                    </button>
                                </div>

                            </form>
                            :
                            <div>
                                {formikHobby.values.hobby1 != '' ?
                                    <label className="bg-lightblue rounded-3 p-1 me-2 mb-2 shadow-sm text-grey-600">
                                        <i className="ti-paint-bucket me-2"></i>
                                        Cooking
                                    </label>
                                    : null
                                }
                                {formikHobby.values.hobby2 != '' ?
                                    <label className="bg-lightblue rounded-3 p-1 me-2 mb-2 shadow-sm text-grey-600">
                                        <i className="ti-desktop me-2"></i>
                                        Play Game
                                    </label>
                                    : null
                                }
                                {formikHobby.values.hobby3 != '' ?
                                    <label className="bg-lightblue rounded-3 p-1 me-2 mb-2 shadow-sm text-grey-600">
                                        <i className="ti-headphone me-2"></i>
                                        Listen Music
                                    </label>
                                    : null
                                }
                                {formikHobby.values.hobby4 != '' ?
                                    <label className="bg-lightblue rounded-3 p-1 me-2 mb-2 shadow-sm text-grey-600">
                                        <i className="ti-car me-2"></i>
                                        Traveling
                                    </label>
                                    : null
                                }
                                {formikHobby.values.hobby5 != '' ?
                                    <label className="bg-lightblue rounded-3 p-1 me-2 mb-2 shadow-sm text-grey-600">
                                        <i className="feather-book-open me-2"></i>
                                        Reading Book
                                    </label>
                                    : null
                                }
                                {formikHobby.values.hobby6 != '' ?
                                    <label className="bg-lightblue rounded-3 p-1 me-2 mb-2 shadow-sm text-grey-600">
                                        <i className="feather-github me-2"></i>
                                        Take-care Pet
                                    </label>
                                    : null
                                }
                                {
                                    userInfo.id === user.id ?
                                        <span
                                            onClick={() => setHobbyStatus(!hobbyStatus)}
                                            className="cursor-pointer hover-opacity p-1 fw-600 text-center d-block font-xss text-grey-800 bg-primary-gradiant rounded-3 ps-2 mt-2">
                                            Add hobbies
                                        </span>
                                        : null
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    </>)
}

export default Intro;