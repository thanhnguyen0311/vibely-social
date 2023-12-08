import ReadMore from "./ReadMore";
import { Card } from "react-bootstrap";
import ppl from "~/assets/img/ppl.png"
import { motion } from "framer-motion";
import ReactTimeAgo from 'react-time-ago'
import { useState } from "react";
import Comment from "../Comment";
import likebtn from "../../assets/img/likebtn.png"
import { likePost } from "~/api/postApi";
import Earth from "~/assets/img/new_post_icons/earth.png"
import Friends from "~/assets/img/new_post_icons/friends.png"
import Private from "~/assets/img/new_post_icons/private.png"
import "./index.css"
import Gallery from "./Gallery";


function PostDetail({data={}}) {
    const [like,setLike] = useState(data.likeCount)
    const [isLiked,setIsLiked] = useState(data.liked)
    const [isShowComment,setIsShowComment] = useState(false)

    const handleClickLike = async () => {
        const response = await likePost(data.id)
        .then(response => {
           setLike(response.likeCount)
           setIsLiked(response.isLiked)
        })
    }

    return (
        <>
            <Card className="w-100 shadow-md rounded-xxl border-0 p-3 mb-3" >
                <Card.Body className="p-0 d-flex mb-3">
                    <figure className="avatar me-2">
                        <img
                            src={!data.author.avatar ? ppl : data.author.avatar}
                            alt="image"
                            className="shadow-sm avatar-45"/>
                    </figure>
                    <h4 className="fw-700 text-grey-900 font-xsss mt-1">
                        {(data.author.firstName ? data.author.firstName : "")  
                        + " "  
                        + data.author.lastName}
                        <span className="flex font-xssss fw-500 mt-1 lh-3 text-grey-500">
                            <ReactTimeAgo date={data.createdDate} locale="en-US"/>
                                                  {data.privacy == "PUBLIC" ? <img src={Earth} className="icon-privacy"/>
                                                    :data.privacy == "FRIENDS" ? <img src={Friends} className="icon-privacy"/>
                                                                               : <img src={Private} className="icon-privacy"/>}
                        </span>
                    </h4>

                    <a href="#" className="ms-auto" id="dropdownMenu2"><i
                        className="ti-more-alt text-grey-900 btn-round-md bg-greylight font-xss"></i></a>
                    <div className="dropdown-menu dropdown-menu-end p-4 rounded-xxl border-0 shadow-lg"
                         aria-labelledby="dropdownMenu2">
                        <div className="card-body p-0 d-flex">
                            <i className="feather-bookmark text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Save Link <span
                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Add this to your saved items</span>
                            </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-alert-circle text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide Post <span
                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                            </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-alert-octagon text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 text-grey-900 font-xssss mt-0 me-4">Hide all from Group <span
                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                            </h4>
                        </div>
                        <div className="card-body p-0 d-flex mt-2">
                            <i className="feather-lock text-grey-500 me-3 font-lg"></i>
                            <h4 className="fw-600 mb-0 text-grey-900 font-xssss mt-0 me-4">Unfollow Group <span
                                className="d-block font-xsssss fw-500 mt-1 lh-3 text-grey-500">Save to your saved items</span>
                            </h4>
                        </div>
                    </div>
                </Card.Body>
                <Card.Body className="p-0 ps-2 me-lg-5">
                    <ReadMore content={data.content} isTextOnly={data.gallery?.length > 0 ? true : false}/>
                </Card.Body>
                      {data.gallery && <Gallery 
						    images={data.gallery} 
						/>}
                <Card.Body className="d-flex p-0 mt-3 ms-2 ">
                    <div 
                       className="emoji-bttn d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss me-2 ">
                            <motion.i
                                className={(isLiked ? "bg-primary-gradiant" : "bg-tumblr") + " feather-thumbs-up cursor-pointer text-white me-1 btn-round-xs me-2 font-xsss"}
                                whileHover={{ scale: 1.4 }}
                                whileTap={{ scale: 1 }}
                                style={{scale: 1.1}}
                                src={likebtn}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                onClick={handleClickLike}
                            />
                            <motion.i
                                className="feather-heart text-white cursor-pointer bg-pinterest ms-1 me-3 btn-round-xs  font-xsss"
                                whileHover={{ scale: 1.6 }}
                                whileTap={{ scale: 1 }}
                                style={{scale: 1.1}}
                                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                                onClick={handleClickLike}
                            />
                        <div className="hover-vibe rounded-xl p-1"> {!like ? 0 : like} Like</div>
                    </div>
                    <div className="emoji-wrap">
                        <ul className="emojis list-inline mb-0">
                            <li className="emoji list-inline-item"><i className="em em---1"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-angry"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-anguished"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-astonished"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-blush"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-clap"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-cry"></i></li>
                            <li className="emoji list-inline-item"><i className="em em-full_moon_with_face"></i></li>
                        </ul>
                    </div>
                    <a 
                    className="hover-vibe rounded-xl d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss"
                    onClick={() => setIsShowComment(true)} >
                        <i
                        className="feather-message-circle text-dark text-grey-900 btn-round-sm font-lg">
                        </i>
                        <span
                        className="d-none-xs"> {!data.commentCount ? 0 : data.commentCount} Comment
                        </span>
                    </a>
                    <a  
                       className="ms-auto d-flex align-items-center fw-600 text-grey-900 text-dark lh-26 font-xssss">
                        <i
                        className="feather-share-2 text-grey-900 text-dark btn-round-sm font-lg"/>
                        <span
                        className="d-none-xs">Share</span>
                        </a>
                </Card.Body>
                <Comment data={data} isShowComment={isShowComment}/>
            </Card>
        </>
    )
}

export default PostDetail;