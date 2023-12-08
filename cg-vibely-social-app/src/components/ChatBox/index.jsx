import {memo, useEffect, useRef, useState} from "react";
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import {useDispatch, useSelector} from "react-redux";
import {selectConversation} from "~/features/switchConversation/index.js";
import {
    loadOldMessages,
    selectAllOldMessages,
    selectLoadOldMessagesIsSuccess,
    selectTotalPage,
    setLoadOldMessagesSuccess
} from "~/features/loadOldMessages/index.jsx";
import {useStompWsClient} from "~/components/HOC_SocketClient/index.jsx";
import {resetNewMessages, selectNewsMessages} from "~/features/messeger/index.jsx";
import Message from "~/components/Messages/Message/index.jsx";
import {Link} from "react-router-dom";
import {selectTypingStatus} from "~/features/typingStatus/index.jsx";


function ChatBox() {
    const [emojiVisible, setEmojiVisible] = useState(false)
    const chatBox = useRef();
    const chatInput = useRef();
    const dispatch = useDispatch();
    const currentConversation = useSelector(selectConversation)
    const messages = useSelector(selectNewsMessages)
    const typingStatus = useSelector(selectTypingStatus)
    const oldMessagesPage = useSelector(selectAllOldMessages)

    const loadOldMessagesSuccess = useSelector(selectLoadOldMessagesIsSuccess)
    const totalPage = useSelector(selectTotalPage)
    const [newMessage, setNewMessage] = useState('');
    const [oldMessages, setOldMessages] = useState([]);
    const [page, setPage] = useState(0);
    const [chatFocus, setChatFocus] = useState(false);
    const [haveContent, setHaveContent] = useState(false);
    const socketClient = useStompWsClient()
    const [displayMessages, setDisplayMessages] = useState([]);

    useEffect(()=>{
        const rvMessages = [...messages].reverse()
        setDisplayMessages(rvMessages)
    },[messages])

//scroll to end
    useEffect(() => {
        // setScrollHeight(chatBox.current.scrollHeight)
        chatBox.current.scrollTop = chatBox.current.scrollHeight;
    }, [messages, currentConversation, loadOldMessagesSuccess])

//dispatch load old messages depend on page and conversation
    useEffect(() => {
        if (Object.keys(currentConversation).length) {
            dispatch(loadOldMessages({
                contact: currentConversation.email,
                page
            }))
        }
    }, [currentConversation, page])

// reset page
    useEffect(() => {
        setPage(0)
        dispatch(resetNewMessages())
        chatInput.current.focus()
        setTimeout(()=>{
            chatBox.current.scrollTop = chatBox.current.scrollHeight;
        },100)
    }, [currentConversation])

    useEffect(() => {
        if (oldMessagesPage && oldMessagesPage[currentConversation.email]) {
            setOldMessages(oldMessagesPage[currentConversation.email])
            dispatch(setLoadOldMessagesSuccess(false))
        }
    }, [loadOldMessagesSuccess, currentConversation, oldMessagesPage])

    function sendMessage() {
        if (currentConversation) {
            if (newMessage) {
                socketClient.publish({
                    destination: "/app/ws",
                    body: JSON.stringify({
                        receiver: currentConversation.email,
                        content: newMessage
                    })
                });

                socketClient.publish({
                    destination: "/app/ws",
                    body: JSON.stringify({
                        isStatusType: true,
                        typingStatus: false,
                        receiver: currentConversation.email,
                        content: ''
                    })
                });
            }
        }
        setNewMessage('')
    }

//send typing status
    useEffect(() => {
        if (socketClient.connected) {
            if (haveContent && chatFocus) {
                socketClient.publish({
                    destination: "/app/ws",
                    body: JSON.stringify({
                        isStatusType: true,
                        typingStatus: true,
                        receiver: currentConversation.email,
                        content: ''
                    })
                });
            } else {
                socketClient.publish({
                    destination: "/app/ws",
                    body: JSON.stringify({
                        isStatusType: true,
                        typingStatus: false,
                        receiver: currentConversation.email,
                        content: ''
                    })
                });
            }
        }
    }, [haveContent, chatFocus])

    useEffect(() => {
        if (newMessage.length > 0) {
            setHaveContent(true)
        } else {
            setHaveContent(false)
        }
    }, [newMessage])

//messages paging
    const pagingHandle = () => {
        const scrollableHeight = chatBox.current.scrollHeight;
        const scrollTop = chatBox.current.scrollTop;
        const clientHeight = chatBox.current.clientHeight;
        if (scrollTop === scrollableHeight*0.8) {
            if (scrollableHeight > clientHeight) {
                console.log('page: ' + page)
                if (page < totalPage - 1) {  //1 page is on redis db
                    console.log('set page')
                    setPage(prevState => prevState + 1)
                }
            }
        }
    }

    useEffect(() => {
        if (chatBox.current) {
            chatBox.current.addEventListener("scroll", pagingHandle)
        }

        return () => {
            removeEventListener("scroll", pagingHandle)
        }
    }, [])

    return (
        <div className="col-lg-12 position-relative">
            <div className="chat-wrapper w-100 position-relative bg-white theme-dark-bg rounded-3">
                <div
                    className='chat-top-label position-absolute px-4 ps-4 bg-primary-gradiant rounded-top-3 shadow-md d-flex justify-content-between'
                    style={{transform: "none", top: 0}}>
                    <div className='px-2 py-1 rounded text-dark d-flex align-items-center'>
                        <img src={currentConversation.avatarUrl}
                             alt="avatar"
                             className='border border-light shadow-md'
                        />
                        <div className='ms-2 fw-bold'>
                            {currentConversation.firstName + ' ' + currentConversation.lastName}
                        </div>
                    </div>
                    <div>
                        <Link to={`/friends/${currentConversation.id}`}
                              className='px-2 py-1 rounded cursor-pointer text-dark'>
                            <i className='feather-info font-lg text-light'></i>
                        </Link>
                    </div>
                </div>
                <div className="chat-body">
                    <div className="messages-content px-3 scroll-bar position-relative pb-5 d-flex flex-column-reverse"
                         ref={chatBox}
                         onClick={() => setEmojiVisible(false)}>

                        {displayMessages.map((message, index) => {
                            let displayMessage = {...message}
                            if (displayMessage.sender === currentConversation.email || displayMessage.receiver === currentConversation.email) {
                                if (displayMessage.sender === currentConversation.email) {
                                    displayMessage.income = true
                                }
                                return <Message key={index} message={displayMessage}/>
                            }
                        })}

                        {oldMessages.map((message, index) => {
                            let displayMessage = {...message}
                            if (displayMessage.sender === currentConversation.email || displayMessage.receiver === currentConversation.email) {
                                if (displayMessage.sender === currentConversation.email) {
                                    displayMessage.income = true
                                }
                                return <Message key={index} message={displayMessage}/>
                            }
                        })}
                        <div className="clearfix">
                            <img src="src/assets/img/KindlyActualKawala-size_restricted.gif"
                                 alt="dot"
                                 hidden={!typingStatus[currentConversation.email]}
                                 style={{height: 45}}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="chat-bottom dark-bg p-3 shadow theme-dark-bg rounded-3">
                {emojiVisible && <div className='emoji-picker d-flex position-absolute' style={{top: '-428px'}}>
                    <Picker data={data}
                            onEmojiSelect={(emoji) => {
                                setNewMessage(prevState => prevState + emoji.native)
                                setEmojiVisible(false)
                                chatInput.current.focus()
                            }}/>
                </div>}
                <div className="chat-form">
                    <button className="bg-grey float-left"
                            onClick={() => setEmojiVisible(prevState => !prevState)}>
                        <i className="ti-face-sad text-grey-600"></i>
                    </button>
                    <div className="">
                        <input type="text"
                               ref={chatInput}
                               value={newMessage}
                               className='form-group bg-lightblue'
                               placeholder="Start typing..."
                               onChange={(event) => {
                                   setNewMessage(event.target.value);
                               }}
                               onKeyDown={(event) => {
                                   if (event.key === "Enter") sendMessage()
                               }}
                               onClick={() => setEmojiVisible(false)}
                               onFocus={() => setChatFocus(true)}
                               onBlur={() => setChatFocus(false)}
                        />
                    </div>
                    <button className="bg-current"
                            onClick={sendMessage}>
                        <i className="ti-arrow-right text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default memo(ChatBox);