import axios from "axios";
import {VIBELY_API} from "~/app/constants.js";
import {getStoredUserData} from "~/service/accountService.js";

export const searchUserApi = async (keyword, page) => {
    let response = {};
    let user = getStoredUserData()
    try {
        response = await axios.get(`${VIBELY_API}/users/search?keyword=${keyword}&number-page=${page}`,
            {
                headers: {
                    Authorization: 'Bearer ' + user.accessToken
                }
            });
    } catch (e) {
        console.log("Get user info error! " + e);
    }
    return response;
}