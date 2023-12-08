import axios from "axios";
import {VIBELY_API, GOOGLE_USER_INFO_API} from "~/app/constants.js";

export const fetchUserInfoFromGoogle = async (googleResponse) => {
    try {
        const response = await axios.get(GOOGLE_USER_INFO_API, {
            headers: {
                Authorization: `Bearer ${googleResponse.access_token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user info from Google:', error);
        return null;
    }
};

export const googleLoginApi = async (data) => {
    let response = null;
    try {
        response = await axios.post(VIBELY_API + '/oauth2/google/login', data)
        return response
    } catch (e) {
        console.log("Login error: " + e);
        return response
    }
}