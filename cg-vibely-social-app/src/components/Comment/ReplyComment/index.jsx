import ppl from "~/assets/img/ppl.png"
import { useState, useEffect, Fragment } from "react";
import ReactTimeAgo from "react-time-ago";
import WrapText from "~/utils/WrapText.jsx";
import useViewport from "~/hooks/viewport";
import { deleteReply, likeReply } from "~/api/postApi";
import { sendBtnStyle, replySection ,replyInputStyle, avatarStyle } from "../CommentLine";
import { motion } from "framer-motion";
import SendBtn from "~/assets/img/new_post_icons/send.png"
import { getStoredUserData, getAccessToken } from "~/service/accountService";
import { Card ,Form,ListGroup,Button } from 'react-bootstrap';
import { Popover , Transition } from '@headlessui/react';
import axios from "axios";
import { VIBELY_API } from "~/app/constants";
import Like from "~/assets/img/likebtn.png"

    function ReplyComment({data
                            ,commentData
                            ,replyData
                            ,setIsReply
                            ,commentCardStyle}) {
        let postID = data.id;
        let commentID = commentData.commentId
        let replyID = replyData.commentId
    
        const user = getStoredUserData() 
        const token = getAccessToken()
        const [inputBox,setInputBox ] = useState("380px")
        const [like,setLike] = useState(replyData.likeCount)
        const [isLiked,setIsLiked] = useState(replyData.liked)
        const [isEdit, setIsEdit] = useState(false)
        const [content, setContent] = useState(replyData.content)
        const [editContent,setEditContent] = useState(replyData.content)
        const [showToolkit,setShowToolkit] = useState(false)
        const viewPort = useViewport();
        const [isDeleted, setIsDeleted] = useState(false)


        const handleLike = async () => {
            const response = await likeReply(postID,commentID,replyID)
            .then(response => {
                setLike(response.likeCount)
                setIsLiked(response.isLiked)
              })
        }

        const editStyle ={
            ...replyInputStyle,
            height: "40px"

         }

        useEffect(() => {
            if (viewPort.width < 800) {
            }
            else{
                setInputBox("380px")
            }
        }, [viewPort.width])


    const submitEdit = async () => {
        let payload = {
                commentId: commentData.commentId,
                replyId: replyData.commentId,
                content: editContent,
            }    
            const formData = new FormData();
            formData.append("payload" , JSON.stringify(payload))
        try{
            const response =  await axios.put(`${VIBELY_API}/posts/${postID}/reply`,formData,{
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ token,
        }})
            .then((response) => {
            setContent(response.data.content)
            setIsEdit(false)
        })}
        catch (error) {
            return error.response
        }
    }

        const handleDelete = async () => {
            const response = await deleteReply(postID,commentID,replyID).then(() => {
                setIsDeleted(true)
            })
        }

        const handleReply = () => {
            setIsReply(true)
        }
    
        const handleEdit = (event) => {
            setEditContent(event.target.value)
            event.target.style.height = 'auto'
            event.target.style.height = event.target.scrollHeight + "px"
        }
        return ( 
        <>
        {!isDeleted  &&  
        <Card 
            style={commentCardStyle}>
                <Card.Body className="comment-item "
                    onMouseEnter={() => setShowToolkit(true)}
                    onClick={() => setShowToolkit(true)}
                    onMouseLeave={() => setShowToolkit(false)}>
                    <div className='d-flex'>
                        <div className="comment-user ms-1 p-2" >
                            <figure >
                                <img 
                                    src=
                                        {replyData.author.avatar 
                                            ? replyData.author.avatar 
                                            : ppl} 
                                    style={avatarStyle} />
                            </figure>
                        <div>
                        </div>
                            </div>
                                <div 
                                    className="comment-wrap shadow-xs mb-1 pe-2 ps-1 p-2" >
                                    {!isEdit ?
                                    <>
                                    <h5 className='user-name ms-1'>
                                            {replyData.author.firstName + " " + replyData.author.lastName }
                                    </h5>
                                    <p className='font-xsss ms-1' >
                                         <WrapText content={content} />
                                    </p>
                                {(like>0) && <Button as="div" 
                                        className="bg-white border-light flex rounded-md shadow-xs p-0"
                                        style={{
                                            width: "45px",
                                            position: "absolute",
                                            bottom: -5,
                                            right: -28
                                        }}>
                                    <img  src={Like} style={{width: "18px", height: '18px'}} /> 

                                    <span className='font-xssss ms-1 text-grey-600 fw-500'> 
                                    { like} 
                                    </span>
                                </Button>}
                                    </>
                                    :
                                        <Form  
                                                className='flex bg-transparent rounded-xxl ms-2 pe-3' 
                                                style={replySection}
                                                >
                                            <Form.Group 
                                                className=''>
                                                <textarea 
                                                        style={{...editStyle , minWidth : inputBox}}
                                                        onChange={handleEdit}
                                                        onFocus={handleEdit}
                                                        defaultValue={content}
                                                        className="ms-0 p-1 ps-3 font-xsss rounded-xxl text-grey-600 fw-500" 
                                                        />
                                            </Form.Group>
                                                    <motion.img 
                                                        whileHover={{scale: 1.2,rotate: -30 }}
                                                        whileTap={{ scale: 0.8 }}
                                                        transition={{ type: "spring", stiffness: 400}}
                                                        src={SendBtn}
                                                        onClick={submitEdit}
                                                        style={sendBtnStyle} />
                                        </Form> }
                                   </div>
                                   <Popover className="edit-box ">
                                    {showToolkit && (replyData.author.id == user.id) && 
                                        <Popover.Button as='div'>
                                            <i className='feather-more-horizontal hover-vibe rounded-circle edit-btn'/>
                                        </Popover.Button>}
                                <Transition
                                         as={Fragment}
                                         enter="transition ease-out duration-200"
                                         enterFrom="opacity-0 translate-x-100"
                                            enterTo="opacity-100 translate-x-10"
                                            leave="transition ease-in duration-150"
                                            leaveFrom="opacity-100 translate-y-0"
                                            leaveTo="opacity-0 translate-y-1"
                                        >
                                <Popover.Panel className="absolute z-10 mt-3 me-5 pe-4">
                                    <div className="border-2 rounded-md  shadow-lg ring-1 ring-opacity-5">
                                        <div className="relative ">
                                            <ListGroup className='bg-white p-1'>
                                                    <ListGroup.Item  
                                                        className='p-1 hover-vibe text-dark font-xsss border-0'
                                                        onClick={() => setIsEdit(true)}>
                                                         Edit
                                                    </ListGroup.Item>
                                                    <ListGroup.Item 
                                                         onClick={handleDelete}
                                                         className='p-1 hover-vibe text-dark font-xsss border-0'
                                                    >
                                                        Delete
                                                    </ListGroup.Item>
                                            </ListGroup>
                                        </div>
                                    </div>
                                </Popover.Panel>
                             </Transition>
                         </Popover>
                            </div>
                            <div 
                                className='d-flex pt-1 justify-content-start font-xssss fw-600' 
                                style={{
                                    marginTop: "-10px",
                                    marginLeft: "45px"
                                    }}>
                            <div 
                                className={"comment-btn ps-2 rounded-xl ms-2 hover-vibe rounded-xl me-2 " 
                                        + (isLiked 
                                        ? "text-vibe" 
                                        : "text-dark")}
                             >
                                <span className='p-1' onClick={handleLike}> 
                                    Like
                                </span>
                            </div>
                                <div 
                                    className="comment-btn text-dark hover-vibe rounded-xl me-2" 
                                    onClick={handleReply}>
                                    <span className='p-1'> 
                                    Reply 
                                    </span>
                                </div>

                                    {isEdit && <div 
                                    className="comment-btn text-dark hover-vibe rounded-xl me-2"
                                    onClick={() => setIsEdit(false)}
                                    >
                                    <span className='p-1' >
                                    Cancel
                                    </span>
                                </div>}
                            <div 
                                className="comment-btn text-dark">
                            <ReactTimeAgo 
                                date={replyData.date} 
                                locale="en-US"/>
                            </div>
                    </div>
                </Card.Body>
             </Card>}
            </>
            
        );
    }

export default ReplyComment;