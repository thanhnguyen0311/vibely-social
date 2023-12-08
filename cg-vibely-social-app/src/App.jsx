import "bootstrap/dist/js/bootstrap.min"
import {BrowserRouter} from 'react-router-dom'
import AppRoutes from './Routes/AppRoutes'
import {useStompWsClient} from "~/components/HOC_SocketClient/index.jsx";
import {useEffect, useRef} from "react";
import {addNewMessage, addUnreadMessage} from "~/features/messeger/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {Toast} from "primereact/toast";
import {setTypingStatus} from "~/features/typingStatus/index.jsx";
import {selectUserData} from "~/features/userAccount/index.js";
import {getFriendsStatus} from "~/features/onlineStatus/index.jsx";
import {selectFriendList} from "~/features/getFriends/index.js";
import {addNotify} from "~/features/notification/index.jsx";

function App() {
    const dispatch = useDispatch()
    const socketClient = useStompWsClient()
    const user = useSelector(selectUserData)
    const friends = useSelector(selectFriendList)
    const toastBottomRight = useRef(null);


    useEffect(() => {
        if (!Notification) {
            console.log('Desktop notifications not available in your browser. Try Chromium.');
            return;
        }
        if (Notification.permission !== 'granted') {
            Notification.requestPermission().then(permission => {
                const notify = new Notification('Vibely', {
                    icon: "src/assets/img/logo.svg",
                    body: "Hey there! Welcome to Vibely Social!",
                });
            });
        }
    })


    useEffect(() => {
        socketClient.onConnect = (frame) => {
            console.log(frame)
            socketClient.subscribe('/users/queue/messages', (message) => {
                const messageContent = JSON.parse(message.body);
                // Feature is in development
                // if (messageContent && messageContent.sender !== user.email) {
                //     // const notify = new Notification(messageContent.senderName, {
                //     //     icon: "src/assets/img/logo.svg",
                //     //     body: messageContent.content,
                //     // });
                //
                //     if (messageContent.isStatusType) {
                //         dispatch(setTypingStatus({
                //             user: messageContent.email,
                //             typingStatus: messageContent.typingStatus
                //         }))
                //     }
                // }
                if (!messageContent.isStatusType) {
                    dispatch(addUnreadMessage(messageContent))
                    dispatch(addNewMessage(messageContent))
                } else {
                    dispatch(setTypingStatus({
                        user: messageContent.sender,
                        typingStatus: messageContent.typingStatus
                    }))
                }
            })
            socketClient.subscribe('/users/queue/notify', (message) => {
                //Feature is in development
                const notify = message.body;
                console.log(JSON.parse(notify))
                dispatch(addNotify(JSON.parse(notify)))
                // showMessage(messageContent,toastBottomRight, 'success')
            })
        }
        socketClient.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        }
        socketClient.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        }
        socketClient.onDisconnect = () => {
            console.log('Disconnected!')
        }
    }, [user])


    useEffect(() => {
        let friendEmails = []
        if (friends) {
            friends.forEach(friend => friendEmails.push(friend.email))
        }
        dispatch(getFriendsStatus(friendEmails))
        const loadStatus = setInterval(() => {
            dispatch(getFriendsStatus(friendEmails))
        }, 10000)

        return () => {
            clearInterval(loadStatus)
        }
    }, [friends])

    const showMessage = (content, ref, severity) => {
        const label = 'You have new message:'

        ref.current.show({severity: severity, summary: content, detail: label, life: 3000});
    };

    return (
        <>
            <BrowserRouter>
                <AppRoutes/>
            </BrowserRouter>
            <Toast ref={toastBottomRight} position="bottom-right"/>
        </>
    )
}

export default App
