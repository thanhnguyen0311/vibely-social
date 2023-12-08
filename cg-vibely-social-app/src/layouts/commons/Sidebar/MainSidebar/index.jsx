import {motion} from "framer-motion";
import useViewport from "~/hooks/viewport.jsx";
import {useEffect, useState} from "react";
import {selectSidebarActive, selectSidebarPosition, toggle} from '~/features/toggleSidebar/index.js'
import {useDispatch, useSelector} from "react-redux";
import MainNavigate from "./MainNavigate/index.jsx";
import Container from "react-bootstrap/Container";


// eslint-disable-next-line react/prop-types
function MainSidebar() {
    const viewPort = useViewport();
    const [isMobile, setIsMobile] = useState(false)
    const [sidebarHover, setSidebarHover] = useState(false)
    const position = useSelector(selectSidebarPosition)
    const sidebarActive = useSelector(selectSidebarActive)
    const dispatch = useDispatch()


    useEffect(() => {
        if (viewPort.width < 576) {
            dispatch(toggle(true))
            setIsMobile(true)
        } else if (viewPort.width >= 576 && viewPort.width < 768) {
            setIsMobile(true)
            dispatch(toggle(true))
        } else if (viewPort.width >= 768 && viewPort.width < 992) {
            setIsMobile(false)
            dispatch(toggle(true))
        } else {
            setIsMobile(false)
            dispatch(toggle(false))
        }
    }, [viewPort.width])

    return (
        <motion.nav style={!isMobile ? {overflow: "visible", left: '-200px', background: "none", zIndex: 1} : {}}
                    animate={!isMobile ? {x: 200} : {}}
                    transition={!isMobile ? {duration: 0.8} : {}}
                    className={(position
                        ? "navigation right-scroll-bar menu-active "
                        : "navigation right-scroll-bar ")
                        + (sidebarActive ? "nav-active" : "")}
                    onMouseOver={() => setSidebarHover(true)}
                    onMouseOut={() => setSidebarHover(false)}>
            <Container className="ps-0 pe-0">
                <MainNavigate sidebarHover={sidebarHover}/>
            </Container>
        </motion.nav>
    );
}

export default MainSidebar;