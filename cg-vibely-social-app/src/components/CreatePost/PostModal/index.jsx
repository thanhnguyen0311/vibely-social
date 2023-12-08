import { Dialog } from '@headlessui/react'
import { motion, AnimatePresence } from "framer-motion"
import { Button, Form, ListGroup } from 'react-bootstrap';
import "./index.css"
import Gallery from "~/assets/img/new_post_icons/gallery.svg"
import Tag from "~/assets/img/new_post_icons/tag.svg"
import Emoji from "~/assets/img/new_post_icons/emoji.svg"
import Theme from "~/assets/img/new_post_icons/theme.svg"
import Smile from "~/assets/img/new_post_icons/smile.svg"
import More from "~/assets/img/new_post_icons/more.svg"
import Mic from "~/assets/img/new_post_icons/mic.svg"
import { useState, useEffect } from 'react'
import addImage from "~/assets/img/new_post_icons/add-image.png"
import toBase64 from '~/utils/toBase64.js';
import Photogrid from "react-facebook-photo-grid";
import { VIBELY_API } from '~/app/constants';
import axios from 'axios';
import fileListFrom from '~/utils/fileListFromFiles';
import { PacmanLoader } from 'react-spinners';
import {getStoredUserData, getAccessToken} from "~/service/accountService.js";
import {createPost} from "../../../features/getPosts"
import { useDispatch } from 'react-redux';
import ppl from "~/assets/img/ppl.png"

	const addImageButtonStyle = {
		border: "none",
		height: '220px',
		width: '500px',
		color: 'black',
		display: 'table-cell'
	}

	const loaderStyle = {
		justifyContent: "center",
		alignItems: "center",
		height: '10vh',
		width: "10vh",
		display: "inline",
		position:"absolute"
	}

function NewPostModal({ isOpen,closeModal }) {
		const User = getStoredUserData();

		const dispatch = useDispatch();
		const token = getAccessToken()
		const [newPostDTO,setNewPostDTO] = useState(
			{
				content: "",
				privacy: "PUBLIC",
				tags: []
			});

		const [postImage,setPostImage] = useState([]);
		const [newImages,setNewImages] = useState([]);
		const [isAddImage,setIsAddImage] = useState(false);
		const [postFileList,setPostFileList] = useState(null);

		const [allowPost, setAllowPost] = useState(null);
		const [isLoading, setLoading] = useState(false);
		const [isError, setIsError] = useState(false);

		const dialogStyle = {
			position: 'fixed',
			alignItems:"center",
			justifyContent:'center',
			zIndex: "1000",
			width:'100%',
			height:'100%' , 
			top: "0%", 
			right : "0%",
			backdropFilter: 'blur(5px)',
			overflow: "visible"
		}

		const handleChangeContent = (target) =>{
			setNewPostDTO({
				...newPostDTO,
				content: target
			})
		}
		
		const handleChangePrivacy = (target) =>{
			setNewPostDTO({
				...newPostDTO,
				privacy: target
			})
		}
		
		const handleChangeImages = (target) =>{
			if (postFileList != null) {
				const joined = postFileList.concat(Array.from(target));
				setPostFileList(joined)
			}
			else {
				setPostFileList(Array.from(target))
			}
			setNewImages(target)
		}

		const handleSubmit = async (event) => {
			event.preventDefault();
			const formData = new FormData();
			if(postFileList != null){
				const files = fileListFrom(postFileList);
				for (const file of files){
					formData.append('files',file)
				}
			}
			formData.append('newPostDTO', JSON.stringify(newPostDTO))
			try {
				setLoading(true)
				const response = await axios.post(`${VIBELY_API}/posts`, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					'Authorization': 'Bearer '+ token,
				},
				}).then(response => {
					dispatch(createPost(response.data))
					setLoading(false)
					setPostFileList(null)
					setPostImage([])
					setNewPostDTO({
						content: "",
						privacy: "PUBLIC",
						tags: []
					})
					closeModal()
				})
			} catch (error) {
				setLoading(false)
				setIsError(true)
			}
		}

		useEffect(() => {
			if(newImages.length != 0){
				setIsAddImage(false);
				let importImages = [...postImage]
				for(let i = 0 ; i < newImages.length ; i++){
					toBase64(newImages[i]).then((result) => {
					importImages.push(result)
					setPostImage(importImages)
					})
				}
				setNewImages([])
			}
			if ( postImage.length != 0 || newPostDTO.content != "") setAllowPost(true)
			else{setAllowPost(false)}
		},[newImages,newPostDTO,postImage]);

		useEffect(() => {
			setTimeout(() => setIsError(false), 1000);
		},[isError]);

		return (
			<AnimatePresence>
					{isOpen && (<Dialog
						open={isOpen}
						onClose={() =>  closeModal }
						as="div"
						className="d-flex justify-content-center "
						style={dialogStyle}>
							<motion.div
								className={"d-flex items-end justify-center dialog-post  pt-3 px-1 text-center "
														+ (isLoading && "blurred-content ") 
														+ (isError && " shake") }
								initial={{
									opacity: 0,
									scale: 0.75,
								}}
								animate={{
									opacity: 1,
									scale: 1,
									transition: {
										ease: "easeOut",
										duration: 0.45,
									},
								}}
								exit={{
									opacity: 0,
									scale: 0.75,
									transition: {
										ease: "easeIn",
										duration: 0.30,
									},
								}}
								style={{
									height : postImage.length != 0 ? "90%" : "fit-content",
									overflowY : "scroll"
								}}
							>
							<div className="dialog-post-wrapper">
								<section className="post-content">
									<div className="header-dialog">
										<span className='ms-4'>Create Post</span>
											<Button 
												className='bg-grey feather-x rounded-circle text-grey-700 p-1 border w35 font-xs' 
												style={{
													float:'right',
													marginRight: "20px"
													}} 
												onClick={closeModal}/>
									</div>
								<Form onSubmit={handleSubmit}>
									<Form.Group className="content-dialog">
										<img 
										src={User.avatarUrl? User.avatarUrl : ppl} 
										alt="logo" 
										className='rounded-circle'
										/>
										<div 
										className="details">
											<p>
												{User?.firstName + " " + User?.lastName}
											</p>
											<Form.Select 
												className="privacy mt-1" 
												onChange={(e) => handleChangePrivacy(e.target.value)}>
												<option value="PUBLIC">🌐 Public</option>
												<option value="FRIENDS">👫 Friends</option>
												<option value="PRIVATE">🔒 Only me</option>
											</Form.Select>
										</div>
									</Form.Group>
										<input 
											accept="image/*"
											type="file"
											multiple
											id="select-image"
											style={{ display: "none" }}
											onChange={(e) =>  handleChangeImages(e.target.files)}
										/>					
										<textarea 
											placeholder="What's on your mind ?" 
											style={(isAddImage || postImage.length > 0 ) ? {maxHeight: "80px"} : {}}
											spellCheck="false" 
											defaultValue={""} 
											onChange={(e) => handleChangeContent(e.target.value)}/>
										{postImage.length > 0 && 
											<motion.div
												initial={{ scale: 0 }}
												animate={{ rotate: 0, scale: 1 }}
												className='border border-1 p-2 rounded-xxxl position-relative'
											> 
										<Button 
												as='label' 
												htmlFor="select-image"
												style={{
													left: "20px",
													top:"15px",
													maxWidth:"190px",
													maxHeight:"38px", 
													position:"absolute",
													alignItems:"start"
												}} 
													className='bg-grey rounded-md text-grey-700 p-0 border font-xsss mt-1' 
											>
										<div 
												className='inline-flex'
												style={{
													marginTop: "-5px",
													marginLeft: "-5px",
													paddingRight:"5px"
												}}
											>
											<img 
												src={addImage} 
												style={{scale:"0.6"}}
											/>
											<span 
												className='mt-3 mb-2'>
												Add Photos/Videos
											</span>
										</div>
									</Button>								
									<Button 
											onClick={() => {setPostImage([]);setPostFileList(null)}} 
											style={{
												right: "20px",
												top:"15px", 
												position:"absolute"
											}}  
											className='bg-grey feather-x  rounded-circle text-grey-700 p-1 border w35 font-xs' 
																		/>
										<div 
											className='preview-upload'>
										<Photogrid
											images={postImage} 
											maxWidth={500}
										/>	
										</div>
									</motion.div>}
		
									{isAddImage && 
									<motion.div 
										className='border border-1 p-2 rounded-xxxl'
										initial={{ scale: 0 }}
										animate={{ rotate: 0, scale: 1 }}> 
									<Button 
										as='label' 
										htmlFor="select-image" 
										id="upload-btn" 
										className='grid'
										style={addImageButtonStyle}>
									<img 
										className='inline-block '
										src={addImage} 
										style={{scale:"1"}}
									/>
									<p 
										className='font-xsss mt-1'>
										Add Photos/Videos
									</p>
									</Button>
									</motion.div>}

								<div className="theme-emoji">
									<img src={Theme} alt="theme" />
									<img src={Smile} alt="smile" />
								</div>
						<Form.Group className="options">
							<p>
								Add to Your Post
							</p>
											
							<ListGroup 
								as="ul" 
								className="list-items-post">
							<ListGroup.Item 
								as="li" 
								onClick={() => {if(postImage.length == 0) setIsAddImage(!isAddImage)}}>
							<img src={Gallery}/>
							</ListGroup.Item>
								<ListGroup.Item as="li"><img src={Tag} /></ListGroup.Item>
								<ListGroup.Item as="li"><img src={Emoji} /></ListGroup.Item>
								<ListGroup.Item as="li"><img src={Mic} /></ListGroup.Item>
								<ListGroup.Item as="li"><img src={More} /></ListGroup.Item>
							</ListGroup>
						</Form.Group>
							<Button 
								type="submit" 
								style={{background: !allowPost && "#e4e6ebff"}} 
								disabled={!allowPost && true} 
								className='border-0 button-post shadow-xss mt-2'>
									Post
							</Button>
						</Form>
						</section>
						</div>
						</motion.div>
					{isLoading && 
					<PacmanLoader  
					cssOverride={loaderStyle}  
					size={25} 
					color="#36d7b7" 
					/>}

					</Dialog>)}
			</AnimatePresence>
		)
}


export default NewPostModal;