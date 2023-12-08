import axios from "axios";
import {VIBELY_API} from "~/app/constants.js";


export const loginApi = async (data) => {
    let response = null;
    try {
        response = await axios.post(VIBELY_API + '/auth/login', data)
        return response
    } catch (e) {
        return response
    }
}
export const registerApi = async (data) => {
    let response = null;
    try {
        response = await axios.post(VIBELY_API + '/users', data)
    } catch (e) {
        console.log('Register error!')
        console.log(e)
    }
    return response;
}

export const checkEmailApi = async (data) => {
    let response = {};
    try {
        response = await axios.get(VIBELY_API + '/users?email=' + data)
        return response.status
    } catch (e) {
        console.log("Check email error: ");
        return e.response.status
    }
}

export const refreshTokenApi = async (refreshToken) => {
    try {
        return await axios.get(VIBELY_API + '/auth/refresh-token', {
            headers: {
                Authorization: 'Bearer ' + refreshToken
            }
        })
    } catch (e) {
        console.log("Refresh token failed!: ");
        console.log(e)
        return e.code
    }
}

export const checkEmailForgotApi = async (email) => {
    try{
        const response = await axios.post(VIBELY_API + '/forgot_password',{email});
        return response.data;
    }
    catch(error){
        throw new Error(error.response.data.error)
    }
};
