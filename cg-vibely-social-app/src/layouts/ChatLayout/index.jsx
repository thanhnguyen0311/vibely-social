import Header from "../commons/Header/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import PreLoader from "~/components/Preloader/index.jsx";
import {turnOffLoader} from "~/features/toggleLoader/index.js";
import {useAuthorizeUser} from "~/hooks/authorizeUser.jsx";

// eslint-disable-next-line react/prop-types
function ChatLayout({children}) {
    const firstLoad = useSelector((state) => state.firstLoad.isOn);
    const dispatch = useDispatch();

    useAuthorizeUser();

    if (firstLoad === false) {
        setTimeout(() => {
            dispatch(turnOffLoader())
        }, 500);
    }

    return (
        <>
            <PreLoader/>
            <div className="main-wrapper color-theme-green">
                <Header/>
                {children}
            </div>
        </>
    );
}


export default ChatLayout;