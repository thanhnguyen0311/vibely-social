import React from 'react';
import ppl from "~/assets/img/ppl.png"
import "./index.css"
import ReplyComment from '../ReplyComment';
import ReactTimeAgo from 'react-time-ago';
import { likeComment, deleteComment } from '~/api/postApi';
import { useState, useRef , Fragment, useEffect } from 'react';
import { Card ,Form,ListGroup, Button} from 'react-bootstrap';
import { getStoredUserData , getAccessToken } from '~/service/accountService';
import { VIBELY_API } from '~/app/constants';
import axios from 'axios';
import WrapText from "~/utils/WrapText.jsx";
import { Popover , Transition } from '@headlessui/react';
import SendBtn from "~/assets/img/new_post_icons/send.png"
import useViewport from "~/hooks/viewport";
import { motion } from "framer-motion";
import Like from "~/assets/img/likebtn.png"

export const sendBtnStyle = {
    width: "32px",
    height: "32px",
    alignSelf: "center",
    padding: "2px",
    marginBottom : "15px",
    cursor: "pointer"
}

export const replySection = {
    width: "90%",
    marginTop: "0px",
    height: "fit-content",
    marginRight: "30px"
}

export const replyInputStyle = {
    whiteSpace: "pre-wrap",
    border: "none",
    outline: "none",
    width: "90%",
    resize: "none",
    overflow: "hidden",
    height: "40px",
    maxWidth : "500px",
    marginRight: "10px",
    transition: "transform 0.3s ease" ,
    marginTop: "0px",
}

export const avatarStyle = {
    minWidth: "36px",
    height: "34px",
    borderRadius: "50%",
    alignSelf: "start",
    marginTop: "-15px"
}


function CommentLine({data,commentData}) {
    let commendID = commentData.commentId
    let postID = data.id
    const user = getStoredUserData() 
    const token = getAccessToken()
    const [inputBox,setInputBox ] = useState("400px")
    const [like,setLike] = useState(commentData.likeCount)
    const [isLiked,setIsLiked] = useState(commentData.liked)
    const [content, setContent] = useState(commentData.content)
    const [gallery, setGallery] = useState(commentData.gallery)
    const [isReply,setIsReply] = useState(false)
    const [inputContent,setInputContent] = useState("")
    const [editContent,setEditContent] = useState(commentData.content)
    const [file,setFile] = useState(null)
    const [commentBox, setCommentBox] = useState("85%")
    const [replys,setReply] = useState(commentData.replyCommentDTOs)
    const [isShowReplies,setIsShowReplies] = useState(false)
    const [showToolkit,setShowToolkit] = useState(false)
    const [isEdit,setIsEdit] = useState(false)
    const viewPort = useViewport();
    const [isDeleted, setIsDeleted] = useState(false)


    const commentCardStyle = {
        width: "auto",
        maxWidth: commentBox,
        padding: 0,
        border: 0,
        marginBottom: "-40px",
        background: "none",
        marginLeft: "15px"
    }

    const handleLike = async () => {
        const response = await likeComment(commentData.commentId,data.id)
        .then(response => {
            setLike(response.likeCount)
            setIsLiked(response.isLiked)
          })
    }
    const handleSelect = (event) => {
        event.target.style.height = 'auto'
        event.target.style.height = event.target.scrollHeight + "px"
        event.target.style.paddingBottom  = 0 +"px"
      }

    const handleEdit = (event) => {
        setEditContent(event.target.value)
        event.target.style.height = 'auto'
        event.target.style.height = event.target.scrollHeight + "px"
    }
    const handleShowReplies = () => {
        let status = isShowReplies
        setIsShowReplies(!status)
    }
    const handleDeleteComment = async () => {
        const response = await deleteComment(postID,commendID)
        .then((response) => {
            setIsDeleted(true)
        })
      }

    const handleEnterDown = async (event)  => {
          if(event.key == "Enter" && inputContent != "") {
            const formData = new FormData();
            formData.append('reply', inputContent)
          try {
                const response =  await axios.post(`${VIBELY_API}/posts/${postID}/reply/${commendID}`, formData, 
                {
                  headers: {
                  'Content-Type': 'multipart/form-data',
                  'Authorization': 'Bearer '+ token,
                },})
                .then((response) => {
                  setInputContent("")
                  if(!replys){
                    setReply([])
                  }
                  setIsShowReplies(true)
                  setIsReply(false)
                  setReply((replys) => [...replys, response.data])
                })
                } catch (error) {
                  setInputContent("")
            }
        }
      }

      
      const submitEdit = async () => {
        let payload = {
            authorId: commentData.author.id,
            commentId: commentData.commentId,
            content: editContent,
        }
        const formData = new FormData();
        formData.append("payload" , JSON.stringify(payload))
            try {
                const response = await axios.put(`${VIBELY_API}/posts/${postID}/comment`,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer '+ token,
            }}).then((response) => {
                setContent(response.data.content)
                setIsEdit(false)
                })
            } catch (error) {
                return error.response
            }
      }

    useEffect(() => {
        if (viewPort.width < 700) {
            setCommentBox((viewPort.width-100) + "px")
            setInputBox("200px")
        }
        else{
            setInputBox("400px")
            setCommentBox("85%") 
        }
    }, [viewPort.width])


    return (    
    <>
    {!isDeleted && 
    <div className="comment-content mt-1">
        <div 
            className="comment-item mb-0 pb-1 mt-1"
            onMouseEnter={() => setShowToolkit(true)}
            onClick={() => setShowToolkit(true)}
            onMouseLeave={() => setShowToolkit(false)}
            >
            <div className='d-flex' >
             <div className="comment-user content-start mt-3  ">
                <figure style={{alignSelf: "start", marginTop: "10px"}}>
                        <img 
                        style={avatarStyle}
                        src={commentData.author.avatar ? commentData.author.avatar : ppl}
                        />
                </figure>
                <div>
                    </div>
                         </div>
                            <div className="comment-wrap shadow-xs pe-2 ms-3 p-2 mt-1 pt-2 mb-1"
                                        style={{maxWidth: commentBox}}>
                                    {!isEdit ? 
                                    <>
                                        <h5 className='user-name'>
                                            {commentData.author.firstName + " " + commentData.author.lastName}
                                        </h5>
                                        <p 
                                            className='font-xsss roboto-font' 
                                            style={{overflowWrap: 'anywhere'}}
                                            >
                                            <WrapText 
                                                content={content} />
                                        </p>
                                        {gallery && <img 
                                            src={gallery} 
                                            style={{
                                                marginTop: "5px",
                                                maxWidth: "150px",
                                                maxHeight: "200px",
                                                padding: "5px"}} />}
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
                                    </> :
                                <Form  
                                    className='flex bg-transparent rounded-xxl mt-1 ms-1 me-3 pe-1' 
                                    style={replySection}
                                    >
                                    <Form.Group 
                                            className='flex-auto'>
                                            <textarea 
                                                style={{...replyInputStyle 
                                                    , minWidth: (inputBox)}}
                                                onChange={handleEdit}
                                                onFocus={handleEdit}
                                                defaultValue={content}
                                                className="ms-0 p-1 ps-3 font-xsss rounded-xxl text-grey-600 fw-500" 
                                                />
                                        </Form.Group>
                                        <motion.img 
                                            whileHover={{scale: 1.2,rotate: -30 }}
                                            whileTap={{ scale: 0.8 }}
                                            transition={{ type: "spring", stiffness: 400,}}
                                            src={SendBtn}
                                            onClick={submitEdit}
                                            style={sendBtnStyle} />
                                 </Form>}
                            </div>
                                <Popover className="edit-box ">
                                    {showToolkit && (commentData.author.id == user.id) && 
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
                                                         onClick={handleDeleteComment}
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
  
                        <div className='d-flex pt-1 justify-content-start font-xssss fw-500' 
                            style={{
                                    marginTop: "-10px",
                                    marginLeft: "55px"
                                    }}>
                                <div 
                                    className={"comment-btn ps-1 rounded-xl me-0 hover-vibe rounded-xl me-2 " 
                                                    + (isLiked ? "text-vibe" : "text-dark")}
                                    onClick={handleLike}>
                                    <span className='p-1'> 
                                          Like
                                    </span>
                                </div>
                                <div 
                                    className="comment-btn text-dark hover-vibe rounded-xl me-2" 
                                    onClick={() => setIsReply(true)}>
                                    <span 
                                    className='p-1' >
                                        Reply
                                    </span>
                                </div>
                                
                                {isEdit && <div 
                                    className="comment-btn text-dark hover-vibe rounded-xl me-2"
                                    onClick={() => setIsEdit(false)}
                                    >
                                        <span 
                                            className='p-1' 
                                            >
                                            Cancel
                                        </span>
                                </div>}
   
                                <div className="comment-btn text-dark">
                                    <ReactTimeAgo 
                                        date={commentData.date} 
                                        locale="en-US"
                                    />
                                </div>

  

                         </div>
                        
                            {(replys?.length > 0) && 
                            <div className='replyshow-btn hover-vibe font-xssss fw-500 text-grey-800'
                                onClick={handleShowReplies}
                                style={{marginBottom: "-10px"}}>
                                    {!isShowReplies

                                    ?  <><i className='feather-corner-down-right'></i>
                                            <span> Show {replys?.length} Replies</span></> 

                                    : <><i className='feather-corner-left-up'></i>
                                            <span> Hide {replys?.length} Replies</span></>   
                                    }
                            </div>}
                    </div>  
                {isShowReplies && replys?.map((reply,index) => {
                            return <ReplyComment 
                                            key={reply.commentId} 
                                            data={data} 
                                            replyData={reply}
                                            commentData={commentData}
                                            setIsReply={setIsReply}
                                            setInputContent={setInputContent}
                                            commentCardStyle={commentCardStyle}
                                            />})}

                 {isReply && 
                 <Card.Body className="d-flex p-0 ms-0 mb-1 ps-5" 
                            style={{width: '90%'}}>
                                <figure 
                                        className="avatar ms-0  p-1 top-2 " >
                                    <img  
                                        style={{width:'30px',height:"28px"}} 
                                        src={user.avatar ? user?.avatar : ppl}  
                                        className="shadow-sm rounded-circle" 
                                    />
                                </figure>
                        <Form 
                            className='bg-transparent rounded-xxl mt-1 ms-2 border-light-md' 
                            style={replySection}>
                            <Form.Group 
                                className='d-flex '>
                                <textarea 
                                    id="input"
                                    onKeyDown={handleEnterDown}  
                                    onBlur={(e)=>e.target.style.height = "40px"}
                                    onSelectCapture={handleSelect}
                                    onChange={(e) => setInputContent(e.target.value)}
                                    value={inputContent}
                                    style={replyInputStyle}
                                    className="ms-0 p-1 ps-3 font-xsss text-grey-600 w-100 fw-500" 
                                    placeholder="Write a comment..." />
                            </Form.Group>
                       </Form>
                  </Card.Body>}
                
        </div>}
        </>
        
    );
};

export default CommentLine;
