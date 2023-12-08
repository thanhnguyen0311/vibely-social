import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import useViewport from "~/hooks/Viewport.jsx";
import {memo, useEffect, useState} from "react";
import Container from 'react-bootstrap/Container';
import {ListGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {selectSidebarActive, selectSidebarPosition, toggle} from "~/features/toggleSidebar/index.js";
import {ProgressSpinner} from "primereact/progressspinner";
import {selectUserData} from "~/features/userAccount/index.js";
import {
    getFriends,
    selectFriendList,
    selectGetFriendIsLoading,
    selectGetFriendIsSuccess,
    setGetFriendsSuccess
} from "~/features/getFriends/index.js";
import {selectConversation, switchConversationTo} from "~/features/switchConversation/index.js";
import MainNavigate from "~/layouts/commons/Sidebar/MainSidebar/MainNavigate/index.jsx";
import {selectOnlineList} from "~/features/onlineStatus/index.jsx";

// eslint-disable-next-line react/prop-types
function ChatSidebar() {
    const viewPort = useViewport();
    const friendList = useSelector(selectFriendList)
    const position = useSelector(selectSidebarPosition)
    const dispatch = useDispatch()
    const [smallScreen, setSmallScreen] = useState(false)
    const user = useSelector(selectUserData)
    const loading = useSelector(selectGetFriendIsLoading)
    const currentConversation = useSelector(selectConversation)
    const success = useSelector(selectGetFriendIsSuccess)
    const [displayFriends, setDisplayFriends] = useState([]);
    const onlineList = useSelector(selectOnlineList)
    const sidebarActive = useSelector(selectSidebarActive)

    useEffect(() => {
        if (viewPort.width < 576) {
            dispatch(toggle(true))
            setSmallScreen(true)
        } else if (viewPort.width >= 576 && viewPort.width < 992) {
            setSmallScreen(false)
            dispatch(toggle(true))
        } else {
            setSmallScreen(false)
            dispatch(toggle(false))
        }
    }, [viewPort.width])

    useEffect(() => {
        if (!success) {
            dispatch(getFriends(user?.id))
        }
        return () => {
            if (success) {
                dispatch(setGetFriendsSuccess(false))
            }
        }
    }, [success, user])

    useEffect(() => {
        if (friendList) {
            let newList = []
            friendList.forEach(friend => {
                newList.push({
                    ...friend,
                    status: onlineList[friend.email]
                })
            })
            newList.sort((a, b) => {
                return b.status - a.status
            })
            setDisplayFriends(newList)
        }
    }, [friendList, onlineList])

    return (
        <div>
            <motion.nav style={!smallScreen ? {overflow: "hidden", left: '-200px'} : {}}
                        animate={!smallScreen ? {x: 200} : {}}
                        transition={!smallScreen ? {duration: 0.8} : {}}
                        className={" " + (position ?
                                "navigation chat-navigation menu-active "
                                : "navigation chat-navigation ")
                            + (sidebarActive ? "nav-active scroll-bar" : "")}>
                <Container className="ps-0 pe-0 d-flex">

                    <MainNavigate chatNav={true}/>
                    <div className="nav-content">
                        <div
                            className="bg-lightblue bg-transparent-card rounded-xxl border shadow-xss pt-2 pb-1 mb-2 mt-2 friend-list-wrap">
                            <div className='hover-scale-1-1 more-btn d-flex justify-content-center cursor-pointer'
                                 onClick={() => dispatch(toggle(!position))}>
                                <i className="font-xxl feather-more-horizontal text-grey-500"></i>
                            </div>

                            <ListGroup as="ul" className="mb-1 top-content ps-1 scroll-bar">
                                <div className='d-flex position-relative justify-content-center '>
                                    {loading && <ProgressSpinner/>}
                                </div>
                                {
                                    displayFriends.map(friend => {
                                        const name = friend.firstName + " " + friend.lastName;
                                        return (
                                            <ListGroup.Item as="li"
                                                            className={'hover-button hover-scale-1-1 rounded smooth-transition mb-1 '
                                                                + (friend.email === currentConversation.email ? 'bg-dark-subtle' : '')}
                                                            style={{
                                                                display: (user && user.email === friend.email) ? "none" : "block",
                                                                border: 'none',
                                                                padding: '0',
                                                                filter: "hue-rotate(338deg)"
                                                            }} key={friend.id}>
                                                <Link to={friend.path}
                                                      className="nav-content-bttn open-font p-0"
                                                      onClick={() => {
                                                          dispatch(switchConversationTo(friend))
                                                      }}>

                                                    <img className="btn-sidebar me-3 border avatar-45 smooth-transition"
                                                         src={friend.avatarUrl} alt={'avatar'}/>
                                                    <span className="">{name}</span>
                                                </Link>
                                            </ListGroup.Item>
                                        )
                                    })
                                }
                            </ListGroup>
                        </div>
                    </div>

                </Container>
            </motion.nav>
        </div>
    )
}

export default memo(ChatSidebar);
