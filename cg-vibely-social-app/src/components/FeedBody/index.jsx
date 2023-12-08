import CreatePost from "~/components/CreatePost/index.jsx";
import PostDetail from "~/components/PostDetail/index.jsx";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import {useAuthorizeUser} from "~/hooks/authorizeUser.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchPosts, resetPost} from "~/features/getPosts/index.js";

import "./index.scss"

function FeedBody () {
    TimeAgo.addDefaultLocale(en)
    useAuthorizeUser()
    const dispatch = useDispatch();
    const {isLoading, isSuccess, newPosts, isFailed , createPost } = useSelector((state) => state.posts);
    const [loaded,setLoaded] = useState(false)


    useEffect(() => {
        dispatch(fetchPosts())
        // fake loader
        if(isLoading === false){
            setTimeout(() => setLoaded(true),500)
        }
        else{
            setLoaded(true)
        }
        return () => {
            dispatch(resetPost())
        };
    },[dispatch]);
    return(
        <>
            <CreatePost />
            { createPost && <PostDetail data={createPost}/>}
            {!loaded ?
                (<div className="preloader-feed">
                    <div className="box shimmer">
                        <div className="lines">
                            <div className="line s_shimmer"></div>
                            <div className="line s_shimmer"></div>
                            <div className="line s_shimmer"></div>
                            <div className="line s_shimmer"></div>
                        </div>
                    </div>
                    <div className="box shimmer mb-3">
                        <div className="lines">
                            <div className="line s_shimmer"></div>
                            <div className="line s_shimmer"></div>
                            <div className="line s_shimmer"></div>
                            <div className="line s_shimmer"></div>
                        </div>
                    </div>
                </div>)
                :

                isSuccess && newPosts && newPosts?.map((post,index) => {
                    return <PostDetail data={post} key={index}/>
                })
            }
        </>
    )
}
export default FeedBody;