import { Card } from "react-bootstrap";
import { useState } from "react";
import NewPostModal from "./PostModal";
import "./index.css"
import ppl from "../../assets/img/ppl.png"
import {getStoredUserData} from "~/service/accountService.js";

function CreatePost() {
    
 	const USER = getStoredUserData()
    const [isOpen, setIsOpen] = useState(false)
    const classBtn = "d-flex align-items-center hover-vibe cursor-pointer p-2 rounded-xxl post-button font-xssss fw-600 ls-1 text-grey-700 text-dark pe-3 ps-3 "

    const closeModal = () => {
        setIsOpen(false)
    }

    return ( <>
        <Card className="w-100 shadow-xss rounded-xxl border-0 ps-2 x pe-4 pb-2 mb-3">
            <Card.Body className="p-0">
                </Card.Body>
                <Card.Body className="p-0 mt-3 d-flex justify-content-center pb-2 ">
                    <figure className="avatar ms-0 mt-1 top-2 " ><img onClick={() => setIsOpen(true)} style={{width: '40px',height: "40px",overflow: 'hidden'}} src={USER?.avatarUrl ? USER?.avatarUrl : ppl}  className="hover-vibe shadow-sm rounded-circle" /></figure>
                    <textarea onClick={() => setIsOpen(true)} style={{height: "50px",width: "90%",resize: "none"}} className="hover-vibe cursor-pointer float-right ms-2 bor-0 rounded-xxl p-2 ps-3 font-xssss text-grey-500 fw-500 border-light-md " placeholder="What's on your mind?" />
                </Card.Body>
                  <NewPostModal isOpen={isOpen} closeModal={closeModal} />
                <div className="d-flex justify-content-center border-top p-2 pt-3 mt-0">
                        <a onClick={() => setIsOpen(true)} className={classBtn}><i className="font-md text-danger feather-video me-2" /><span className="d-none-xs">Live Video</span></a>
                        <a onClick={() => setIsOpen(true)} className={classBtn}><i className="font-md text-success feather-image me-2" /><span className="d-none-xs">Photo/Video</span></a>
                        <a onClick={() => setIsOpen(true)} className={classBtn}><i className="font-md text-warning feather-camera me-2" /><span className="d-none-xs">Feeling/Activity</span></a>
                </div>
        </Card>
        </>
     );
}

export default CreatePost;