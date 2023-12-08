import {selectSidebarPosition, toggle} from "~/features/toggleSidebar/index.js";
import {ListGroup} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {motion} from "framer-motion";
import {useDispatch, useSelector} from "react-redux";
import useSidebarData from "~/data/SideBarData.jsx";
import {useStompWsClient} from "~/components/HOC_SocketClient/index.jsx";
import {resetAccountState} from "~/features/userAccount/index.js";

function MainNavigate({sidebarHover, chatNav = false}) {
    const position = useSelector(selectSidebarPosition)
    const dispatch = useDispatch()
    const socketClient = useStompWsClient()
    const navigate = useNavigate()
    const SidebarData = useSidebarData()
    const moreBtnStyle = {
        position: 'relative',
        cursor: 'pointer',
        zIndex: 5,
        display: 'flex',
        justifyContent: "center",
    }

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem("lastAuth")
        dispatch(resetAccountState())
        socketClient.deactivate()
        navigate("/login")
    }

    return (
        <div className={chatNav ? "chat-nav" : "nav-content"}>
            <div
                className="nav-wrap top-nav-item bg-white bg-transparent-card rounded-xxl shadow-xss pb-1 pt-1 mb-2 mt-2">
                {!chatNav && <div style={moreBtnStyle} className='more-btn'
                                  onClick={() => {
                                      if (!chatNav) dispatch(toggle(!position))
                                  }}>
                    <i className="font-xxl feather-more-horizontal text-grey-500"
                       style={sidebarHover ? {visibility: "visible"} : {visibility: "hidden"}}></i>
                </div>}
                <ListGroup as="ul" className="mb-2 top-content right-scroll-bar">
                    {SidebarData.map((item, index) => {
                        return (
                            <ListGroup.Item as="li"
                                            style={{
                                                border: 'none',
                                                padding: '0',
                                                filter: "hue-rotate(338deg)"
                                            }} key={index}>
                                <Link to={item.path} className="nav-content-bttn open-font">
                                    {window.location.pathname === item.path
                                        ? <motion.img
                                            className={" btn-sidebar me-3 "}
                                            whileHover={{scale: 1.2}}
                                            style={{width: 50}} src={item.icon}/>
                                        : <motion.img
                                            whileHover={{scale: 1.2}}
                                            onHoverStart={e => {
                                            }}
                                            onHoverEnd={e => {
                                            }}
                                            style={{
                                                maxHeight: 50,
                                                minWidth: 50,
                                                minHeight: 50,
                                                width: 50,
                                                objectFit: "cover"
                                            }}
                                            className={" btn-sidebar me-3 "} src={item.icon}/>}
                                    {(window.location.pathname === item.path)
                                        ? <span className="text-primary">{item.heading}</span>
                                        : <span className="">{item.heading}</span>}
                                </Link>
                            </ListGroup.Item>)
                    })}
                </ListGroup>
            </div>
            <div className="nav-wrap bg-white bg-transparent-card rounded-xxl shadow-xss pt-3 pb-1">
                <div className="nav-caption fw-600 font-xssss text-grey-500">Account</div>
                <ListGroup as="ul" className="mb-1">
                    <ListGroup.Item as="li" style={{border: 'none', padding: '0'}}
                                    className="logo d-none d-xl-block d-lg-block">
                    </ListGroup.Item>
                    <ListGroup.Item as="li" style={{border: 'none', padding: '0'}}>
                        <Link to="/profile" className="nav-content-bttn open-font h-auto pt-2 pb-2 ">
                            <i className="font-sm feather-settings me-3 text-grey-500"></i>
                            <span>Settings</span>
                        </Link>
                    </ListGroup.Item>
                    <ListGroup.Item as="li" className="border-0 p-0 cursor-pointer no-icon"
                                    onClick={handleLogout}>
                        <a className="nav-content-bttn open-font h-auto pt-2 pb-2">
                            <i className="font-sm feather-log-out me-3 text-grey-500"></i>
                            <span>Log out</span>
                        </a>
                    </ListGroup.Item>
                </ListGroup>
            </div>
        </div>
    )
}

export default MainNavigate;