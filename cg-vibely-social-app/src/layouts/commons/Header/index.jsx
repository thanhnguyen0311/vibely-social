import {Link, useNavigate} from 'react-router-dom';
import {forwardRef, useEffect, useState} from 'react';
import NavData from "~/data/NavData.jsx"
import Dropdown from 'react-bootstrap/Dropdown';
import {motion} from 'framer-motion';
import Avatar from '~/assets/img/ppl.png'
import Logo from '~/assets/img/logo.svg'
import {Form, FormGroup} from 'react-bootstrap';
import {useDispatch, useSelector} from 'react-redux';
import {toggleChatButton} from '~/features/toggleChat';
import {useAuthorizeUser} from "~/hooks/authorizeUser.jsx";
import {getStoredUserData} from "~/service/accountService.js";
import {useFormik} from "formik";
import {searchUser} from "~/features/searchUser/index.js";
import * as Yup from "yup";
import {setKeyword} from "~/features/getKeywordSearch/index.js";
import {useStompWsClient} from "~/components/HOC_SocketClient/index.jsx";
import {selectUserData} from "~/features/userAccount/index.js";
import {activeSidebar} from "~/features/toggleSidebar/index.js";
import {selectNotifications} from "~/features/notification/index.jsx";
import ReactTimeAgo from "react-time-ago";

function Header() {
    const USER = getStoredUserData()
    const dispatch = useDispatch();
    let isFocusNotification = false;
    const [displayNotifications, setDisplayNotifications] = useState([]);
    const [isOnMess, setIsOnMess] = useState(false);
    const [active, setActive] = useState(false);
    const isChatPage = window.location.pathname === '/messenger'
    const navigate = useNavigate();
    const user = useSelector(selectUserData)
    const notifications = useSelector(selectNotifications)
    const socketClient = useStompWsClient()

    useAuthorizeUser()

    useEffect(() => {
        let listNotify = [...notifications]
        console.log(notifications)
        listNotify.reverse()
        console.log(listNotify)
        setDisplayNotifications(listNotify)
    }, [notifications])

    const handleNavClick = () => {
        setActive(prevState => !prevState)
        dispatch(activeSidebar(!active))
    }

    useEffect(() => {
        if (user.accessToken) {
            if (!socketClient.connected) {
                socketClient.deactivate();
                socketClient.connectHeaders = {
                    Authorization: 'Bearer ' + user.accessToken
                }
                socketClient.activate()
                console.log('activated')
            }
        }
    }, [user.accessToken])

    const customToggle = forwardRef(({children, onClick}, ref) => (
        <div className='position-relative'>
            <motion.a whileHover={{scale: [1, 1.4, 1.2], cursor: "pointer"}}
                      transition={{duration: 0.3}}
                      ref={ref}
                      onClick={(e) => {
                          e.preventDefault();
                          onClick(e);
                          isFocusNotification = !isFocusNotification
                      }}
                      style={{fontSize: '1.5rem'}}
                      className={isFocusNotification
                          ? ' btn-round-md text-vibe bg-vibe-light'
                          : ' btn-round-md text-grey-500 bg-greylight'}>
                <i className="feather-bell"></i>
            </motion.a>
            {
                (notifications?.length > 0) &&
                <span className="dot-count bg-danger font-xsssss text-light fw-bold">{notifications?.length}</span>
            }
        </div>
    ));


    const formikSearch = useFormik({
        initialValues: {
            keyword: '',
        },
        enableReinitialize: true,

        validationSchema: Yup.object({
            keyword: Yup
                .string()
                .required()
        }),

        onSubmit: (values) => {
            dispatch(searchUser({
                keyword: values.keyword,
                page: 0
            })).then(() => {
                formikSearch.resetForm();
                dispatch(setKeyword(values));
                if (!window.location.pathname.includes('search')) {
                    navigate('/search');
                }
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
            });
        }
    });

    return (
        <div className="nav-header shadow-xs border-0">
            <div className="nav-top">
                <Link to='/'>
                    <motion.img
                        whileHover={{scale: 1.2}}
                        style={{maxWidth: 50, zIndex: "10000"}} className='d-inline-block  logo-nav' src={Logo}/>
                </Link>
                <span className="cursor-pointer mob-menu ms-auto me-2 chat-active-btn"
                      onClick={() => dispatch(toggleChatButton())}>
                    {!isChatPage &&
                        <i className="feather-message-circle text-grey-900 font-sm btn-round-md bg-greylight"></i>}
                </span>
                <span className="cursor-pointer mob-menu me-2"><i
                    className="feather-video text-grey-900 font-sm btn-round-md bg-greylight"></i></span>
                <span className="cursor-pointer me-2 menu-search-icon mob-menu"><i
                    className="feather-search text-grey-900 font-sm btn-round-md bg-greylight"></i></span>
                <button className={"nav-menu me-0 ms-2 cursor-pointer " + (active ? "active" : "")}
                        onClick={handleNavClick}>
                </button>
            </div>

            <Form className="float-left header-search" onSubmit={formikSearch.handleSubmit}>
                <FormGroup className=" mb-0 icon-input">
                    <i className="feather-search font-md text-grey-400 me-2 position-absolute"
                       style={{marginTop: '12px', marginLeft: '18px'}}/>
                    <input
                        onKeyDown={(event) => {
                            if (event.keyCode === 13) {
                                event.preventDefault();
                                formikSearch.submitForm();
                            }
                        }}
                        onChange={formikSearch.handleChange}
                        value={formikSearch.values.keyword}
                        name="keyword"
                        type="text" placeholder="search on vibely..."
                        style={{backgroundColor: '#ebebeb'}}
                        className="border-0 lh-32 pt-2 pb-2 ps-5 pe-3 font-xssss fw-500 rounded-xl w350 theme-dark-bg"/>
                </FormGroup>
            </Form>

            <div className='ms-3'></div>
            {NavData.map((item, index) => {
                return <div key={index}
                ><Link
                    to={item.path} key={item.path} className=" p-2 text-center ms-0 menu-icon center-menu-icon">
                    <motion.i
                        whileHover={{scale: [null, 1.5, 1.5]}}
                        transition={{duration: 0.3}}
                        className={
                            window.location.pathname === item.path
                                ? "font-lg btn-round-md   text-vibe  bg-vibe-light"
                                : "font-lg btn-round-md  text-grey-500 bg-greylight"
                        }>
                        <i style={window.location.pathname === item.path
                            ? {fontSize: "1.6rem", fontWeight: '550'}
                            : {fontSize: "1.4rem"}
                        } className={item.icon}/></motion.i>
                </Link></div>
            })}

            <Dropdown variant="secondary" className='p-2 text-center ms-auto menu-icon'>
                <Dropdown.Toggle as={customToggle}/>
                <Dropdown.Menu style={{width: '350px', overflow: 'auto'}}
                               className='dropdown-menu dropdown-menu-end p-4 rounded-3 border-0 shadow-lg'>
                    <h5 className="fw-700 font-xs mb-4 text-vibe">Notifications</h5>
                    {(displayNotifications.length > 0) ? displayNotifications?.map((notify, index) => {
                        if (index < 3) {
                            return (
                                <Link to={`/friends/${notify.fromUser}`} key={index}>
                                    <div className='bg-transparent-card w-100 border-0 mt-2 p-2 hover-card rounded'>
                                        <div className="d-flex">
                                            <img src={notify.avatarUrl} alt="user" className="avatar-45 left-0"/>
                                            <h5 style={{whiteSpace: 'pre-wrap'}}
                                                className=" ms-3 mb-2 mt-0 d-block font-xsss text-grey-900">
                                                {notify.content}
                                            </h5>
                                        </div>
                                        <div className="d-flex justify-content-end">
                                            <ReactTimeAgo date={notify.createdAt} className="font-xssss"
                                                          locale="en-US"/>
                                        </div>
                                    </div>
                                </Link>
                            )
                        }
                    }) : <span className="font-xsss text-grey-500">You have no new notifications</span>}
                </Dropdown.Menu>
            </Dropdown>

            {!isChatPage && <motion.a
                onClick={() => dispatch(toggleChatButton())}
                whileHover={{scale: [null, 1.4, 1.3]}}
                transition={{duration: 0.3}} onClickCapture={() => {
                setIsOnMess(prevState => !prevState)
            }}
                className="p-2 text-center ms-3 menu-icon chat-active-btn ">
                <i style={{fontSize: '1.5rem'}}
                   className={"feather-message-square cursor-pointer btn-round-md "
                       + (isOnMess ? "bg-vibe-light text-vibe" : "bg-greylight text-grey-500")}>
                </i>
            </motion.a>}

            <Link to="/profile" className="p-0 ms-3 menu-icon">
                <motion.img whileHover={{scale: [null, 1.5, 1.4]}}
                            transition={{duration: 0.3}}
                            src={USER?.avatarUrl ? USER?.avatarUrl : Avatar}
                            className="w45 rounded-xl mt--1"/>
            </Link>

        </div>
    );
}

export default Header;

