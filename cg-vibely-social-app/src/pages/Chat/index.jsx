import ChatBox from "~/components/ChatBox/index.jsx";
import {selectSidebarPosition} from "~/features/toggleSidebar/index.js";
import {useSelector} from "react-redux";
import {useAuthorizeUser} from "~/hooks/authorizeUser.jsx";
import ChatSidebar from "~/layouts/commons/Sidebar/ChatSidebar/index.jsx";
import {selectConversation} from "~/features/switchConversation/index.js";

function Chat() {
    const position = useSelector(selectSidebarPosition)
    const currentConversation = useSelector(selectConversation)
    useAuthorizeUser()
    return (
        <>
            <ChatSidebar/>
            <div className={'main-content ' + (position ? 'chat-menu-active' : 'chat-menu')}>
                <div className="middle-sidebar-bottom d-flex pt-0 mt-3">
                    <div className="middle-sidebar-left ms-0 ps-0 pe-0 me-0 d-flex justify-content-center"
                         style={{maxWidth: '100%', height: 'calc(100vh - 110px)'}}>
                        <div className="container ms-2 mb-0 pb-0 me-1 overflow-hidden" style={{maxWidth: '96%'}}>
                            {currentConversation.email ? <ChatBox/> :
                                <div className="col-12 position-relative border-start d-flex justify-content-center align-items-center"
                                     style={{height: 'calc(100vh - 110px)'}}>
                                    <div className="mont-font display1-size">Select a conversation to start</div>
                                    <i className="feather-message-circle position-absolute spin-3d"
                                       style={{fontSize: 500, opacity: 0.2}}>
                                    </i>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chat