import React, { useState, useEffect } from 'react';
import { Card,Form, Button } from 'react-bootstrap';
import ppl from "~/assets/img/ppl.png"
import "./index.css"
import { VIBELY_API } from '~/app/constants.js';
import axios from 'axios';
import { getAccessToken , getStoredUserData } from '~/service/accountService.js';
import { commentPosts } from '~/api/postApi';
import { BeatLoader } from 'react-spinners';
import AddImageBtn from "~/assets/img/new_post_icons/add-image.png";
import { motion } from "framer-motion";
import CommentLine , { sendBtnStyle } from './CommentLine';
import SendBtn from "~/assets/img/new_post_icons/send.png"
import toBase64 from '~/utils/toBase64.js';
import UseAnimations from "react-useanimations";
import trash2 from 'react-useanimations/lib/trash2';

const imgStyle = {
  maxWidth: "100px",
  padding: "15px",
  marginTop: "-10px"
}

const btnStyle = {
  ...sendBtnStyle,
  marginRight: "10px",
  scale : "1",
  marginBottom: "0px",
  marginTop: "0px",
  alignSelf: "start"

}

function Comment({data,isShowComment}) {   
    const token = getAccessToken()
    const [comments,setComments] = useState([])
    const [inputContent,setInputContent] = useState("")
    const [file,setFile] = useState(null)
    const [isLoading,setIsLoading] = useState(false)
    const user = getStoredUserData()
    const [onFocusComment, setOnFocusComment] = useState(false)
    const [commentGallery, setCommentGallery] = useState(null)
    const [showGallery, setShowGallery] = useState(null)
    const [imageTooltip, setImageTooltip] = useState(false)

    const getComments = async() => {
      setIsLoading(true)
      const response = await commentPosts(data.id)
      .then(response => {
        setComments(response)
        setIsLoading(false)
      })
    }
    
    useEffect(() => {
      if(isShowComment) getComments()
    },[isShowComment])


    const  handleSubmit = async (event)  => {
      let newComment =  inputContent
        if(inputContent != "" || commentGallery) {
          const formData = new FormData();
          formData.append('newComment', newComment)
          if(commentGallery){
            formData.append('file', commentGallery)
            }
            try {
              const response =  await axios.post(`${VIBELY_API}/posts/${data.id}/comment`, formData, 
              {
                headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer '+ token,
            },
            }).then((response) => {
                setInputContent("")
                setOnFocusComment(false)
                setShowGallery(null)
                setCommentGallery(null)
                setComments((comments) => [...comments, response.data])
              })
            } catch (error) {
                setInputContent("")
            }
      }
    }


    const handleChangeImages = (target) =>{
      toBase64(target).then((result) => {
      setShowGallery(result)
    })
	  setCommentGallery(target)
	}


    const handleFocusOut = (event) => {
      event.target.style.height = "40px"
    }
     
    const deleteImage = () => {
      setShowGallery(null)
      setCommentGallery(null)
    }

    const handleSelect = (event) => {
      setOnFocusComment(true)
      event.target.style.height = 'auto'
      event.target.style.height = event.target.scrollHeight + "px"
      event.target.style.paddingBottom  = "-20px"
    }

      return (
            <>
              {!isShowComment && 
              <Card.Body  
              className="p-0 pt-3 d-flex pb-0 border-dark mt-3">
                  <figure className="avatar mt-1 top-2 " >
                          <img  
                              style={{
                                width: '40px',
                                height: "38px",
                                overflow: 'hidden'}} 
                              src={user.avatar ? user?.avatar : ppl}  
                              className="shadow-sm rounded-circle" />
                    </figure>
                    <Form className='comment-box rounded-xxl ms-2 bor-0 border-light-md'
                            >
                            <Form.Group className='d-flex'>
                            <textarea 
                                  id="input"
                                  onBlur={handleFocusOut}
                                  onSelectCapture={handleSelect}
                                  value={inputContent}
                                  onChange={(e) => setInputContent(e.target.value)}
                                  className="comment-input ms-0 p-1 ps-3 font-xsss text-grey-600 fw-500 " 
                                  placeholder="Write a comment..." 
                                  />
                        <div 
                          className='flex'
                          style={{
                          justifyContent: "space-between",
                          alignSelf: "start"}}
                          >
                       {onFocusComment && <Button    
                                  as='label' 
                                  htmlFor={data.id}
                                  className='bg-transparent border-0'
                                  style={btnStyle}>
                               <motion.img 
                                  whileHover={{scale: 0.9,rotate: 0 }}
                                  whileTap={{ scale: 0.7 }}
                                  transition={{ type: "spring", stiffness: 400}}
                                  src={AddImageBtn}
                                 />
                                 </Button>}
                        {onFocusComment && 
                        <motion.img 
                                  whileHover={{scale: 1.0,rotate: 0 }}
                                  whileTap={{ scale: 0.9 }}
                                  transition={{ type: "spring", stiffness: 400}}
                                  src={SendBtn}
                                  onClick={handleSubmit}
                                  style={btnStyle}
                            /> }
                        <input 
                                accept="image/*"
                                type="file"
                                id={data.id}
                                style={{ display: "none" }}
                                onChange={(e) =>  handleChangeImages(e.target.files[0])}
                           />		
                      </div>
                      </Form.Group>
                        {showGallery && <div style={{
                                position: "absolute",
                                marginLeft: "85px",
                                marginTop: "5px",
                                cursor: "pointer",
                                zIndex: 5,
                                opacity: "80%"
                              }}>
                          <UseAnimations  
                              onClick={deleteImage}
                              animation={trash2} 
                              size={20} />
                        </div>}
                        <img 
                          src={showGallery} 
                          style={imgStyle}/>
                    </Form>
              </Card.Body>}


              <Card.Body  
                    className="d-flex " 
                    id="comment-section">
                <div 
                    className="pt-0 w-100 position-relative scroll-bar bg-white "
                    style={{
                    maxHeight: "500px",
                    overflowX: "hidden"
                    }}>
                <div 
                    className="comment-body p-0 pt-1" >

                    {isLoading  && 
                    <div className='d-flex justify-content-center p-2'>
                        <BeatLoader color="#36d7b7" />
                    </div>}

                     {!isShowComment  && data?.topComment && 
                <CommentLine 
                    data={data} 
                    commentData={data?.topComment}
                    />}
                    {comments 
                     && comments.map((comment,index) => {
                     return <CommentLine 
                                          key={index} 
                                          data={data} 
                                          commentData={comment}/>
                          })}
                    </div>
                </div>
              </Card.Body>
             {isShowComment && <Card.Body 
                      className="d-flex p-0 mt-2" >
                        <figure 
                        className="avatar ms-0 mt-1 top-2 " >
                          <img  
                              style={{
                                width: '35px',
                                height: "32px",
                                overflow: 'hidden'}} 
                              src={user.avatar 
                                ? user
                                ?.avatar : ppl}  
                              className="shadow-sm input-comment-avatar rounded-circle" />
                        </figure>
                  <Form 
                  className='comment-box rounded-xxl mt-1 ms-2 border-light-md' >
                        <Form.Group 
                        className='d-flex '>	
                             <textarea 
                                id="input"
                                onBlur={(e)=> e.target.style.height = "50px"}
                                onSelectCapture={handleSelect}
                                onChange={(e) => setInputContent(e.target.value)}
                                value={inputContent}
                                className="comment-input ms-0 p-1 ps-3 font-xsss text-grey-600 fw-500" 
                                placeholder="Write a comment..." />
                      <div 
                           className='flex'
                            style={{
                            justifyContent: "space-between",
                            alignSelf: "start"
                          }}
                           >
                        {onFocusComment && 
                                <Button    
                                  as='label' 
                                  htmlFor={data.id}
                                  className='bg-transparent border-0'
                                  style={btnStyle}>
                                <motion.img 
                                  whileHover={{scale: 0.9,rotate: 0 }}
                                  whileTap={{ scale: 0.7 }}
                                  transition={{ type: "spring", stiffness: 400}}
                                  src={AddImageBtn}
                                /> 
                                  </Button>}
                        {onFocusComment && <motion.img 
                                  whileHover={{scale: 1.0,rotate: 0 }}
                                  whileTap={{ scale: 0.9 }}
                                  transition={{ type: "spring", stiffness: 400}}
                                  src={SendBtn}
                                  onClick={handleSubmit}
                                  style={btnStyle}
                            /> }
                           <input 
                                accept="image/*"
                                type="file"
                                id={data.id}
                                style={{ display: "none" }}
                                onChange={(e) =>  handleChangeImages(e.target.files[0])}
                           />		
                          </div>
                        </Form.Group>
                        {showGallery && 
                        <div style={{
                                position: "absolute",
                                marginLeft: "85px",
                                marginTop: "5px",
                                cursor: "pointer",
                                zIndex: 5,
                                opacity: "80%"
                              }}>
                          <UseAnimations  
                              onClick={deleteImage}
                              animation={trash2} 
                              size={20} />
                        </div>}
                        <img 
                        src={showGallery} 
                        style={imgStyle}/>
                  </Form>
              </Card.Body>}
              
            </>
          );
      }

export default Comment;