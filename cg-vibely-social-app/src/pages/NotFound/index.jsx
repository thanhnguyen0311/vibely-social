import {useNavigate} from "react-router-dom";
import {Button, Row} from "react-bootstrap";
import notfound from "~/assets/img/404.svg"
import "./index.css"
import ppl from "~/assets/img/logo.svg"
import { useRef } from "react";
import { useAnimationFrame } from "framer-motion";

function NotFound() {
    const ref = useRef(null);
    const navigate= useNavigate()

    useAnimationFrame((t) => {
        const y = (1 + Math.sin(t / 1000)) * 45;
        ref.current.style.transform = `translateY(${y}px)`;
      });


    return (
        <>
            <Row className="justify-content-center body-404">
                <img src={notfound} className="notfound" style={{maxWidth: "100vh"}}/>
                <Button className="back-to-home bg-transparent border-0" onClick={() => navigate("/")} >
                        <div className="bloom-container cube" ref={ref}>
                            <div className="back-to-home-container-main shadow" >
                                    <img style={{maxWidth: "4.5rem"}}    src={ppl} />
                            </div>
                        </div>
                    </Button>
            </Row>
        </>
    );
}

export default NotFound;