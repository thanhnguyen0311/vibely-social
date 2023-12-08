import RingLoader from "react-spinners/RingLoader"
import './index.css'
import { useSelector , useDispatch } from "react-redux";
import { turnOffLoader } from "~/features/toggleLoader";

function PreLoader() {
    const firstLoad = useSelector((state) => state.firstLoad.isOn);
    const dispatch = useDispatch()

    if(firstLoad === false ){
        setTimeout(() => {
          dispatch(turnOffLoader())
        }, 1500);
    }
    
    const loaderStyle = {
        scale: "3",
        visibility: "visible",
        opacity: 1,
        transition: 'invisible 0s 2s, opacity 2s linear'
    }

    return (
        <div className="preloader" style={firstLoad ? {display: 'none'} : {display: "flex"}}>
            <RingLoader cssOverride={loaderStyle} color="#36d7b7"/>
        </div>
    );
}

export default PreLoader;