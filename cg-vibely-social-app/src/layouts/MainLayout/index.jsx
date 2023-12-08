import Header from "../commons/Header/index.jsx";
import RightChat from "~/components/RightChat/index.jsx";
import {useSelector} from "react-redux";
import {useState} from "react";
import PreLoader from '~/components/Preloader'
import {selectSidebarPosition} from '~/features/toggleSidebar'
import MainSidebar from "../commons/Sidebar/MainSidebar/index.jsx";

// eslint-disable-next-line react/prop-types
function MainLayout({children, path}) {
    const position = useSelector(selectSidebarPosition)
    const [isLoading, setIsLoading] = useState(useSelector((state) => state.firstLoad.isOn));

    if (!isLoading) {
        setTimeout(() => {
            setIsLoading(true);
        }, 800);
    }

    return (
        <>
            <PreLoader/>
            {isLoading &&
                <div className="main-wrapper color-theme-green">
                    <Header/>
                    <MainSidebar/>
                    <div className={'main-content ' + (position ? 'menu-active' : '')}>
                        <div className="middle-sidebar-bottom">
                            <div className="middle-sidebar-left" id={(path === "/friends") ? "middle" : ""}>
                                {children}
                            </div>
                        </div>
                    </div>
                    <RightChat/>
                </div>}
        </>
    );
}


export default MainLayout;