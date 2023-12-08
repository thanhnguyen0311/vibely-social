import axios from "axios";
import { getAccessToken } from "~/service/accountService";
import {VIBELY_API , HEADERS as headers} from "~/app/constants.js";

const header = {
    'Authorization': 'Bearer ' + getAccessToken()
  };

export const getPostDetail = async (id) => {
    let result = null;
    try {
        result = await axios.get(`${VIBELY_API}/posts/${id}`,{headers});
    } catch (e) {
        return e.response
    }
    return result;
};

export const getPostsList = async () => {
    try {
        const response = await axios.get(`${VIBELY_API}/posts`,{headers});
        return response
    } catch (error) {
        console.log(error)
    }
};

export const likePost = async (postId) => {
    try {
        const response = await axios.get(`${VIBELY_API}/posts/like/${postId}`,{headers});
        return response.data
    } catch (error) {
        return error.response
    }
};

export const commentPosts = async (postId) => {
    try {
        const response = await axios.get(`${VIBELY_API}/posts/${postId}/comments/list`,{headers});
        return response.data
    } catch (error) {
        return error.response
    }
};

// export const editComment = async (postId) => {
//     try {
//         const response = await axios.get(`${VIBELY_API}/posts/${postId}/comments`,{headers});
//         return response.data
//     } catch (error) {
//         return error.response
//     }
// };

export const deleteComment = async (postID,cmtID) => {
    try {
        const response = await axios.delete(`${VIBELY_API}/posts/${postID}/comment/${cmtID}`,{headers});
        return response
    } catch (error) {
        return error.response
    }
};

export const likeComment = async (postId,commentId) => {
    try {
        const response = await axios.get(`${VIBELY_API}/posts/${postId}/like/${commentId}`,{headers});
        return response.data
    } catch (error) {
        return error.response
    }
};

export const likeReply = async (postId,commentId,replyId) => {
    try {
        const response = await axios.get(`${VIBELY_API}/posts/${postId}/like/${commentId}/${replyId}`,{headers});
        return response.data
    } catch (error) {
        return error.response
    }
};

export const deleteReply = async (postId,commentId,replyId) => {
    try {
        const response = await axios.delete(`${VIBELY_API}/posts/${postId}/comment/${commentId}/${replyId}`,{headers});
        return response
    } catch (error) {
        return error.response
    }
};
