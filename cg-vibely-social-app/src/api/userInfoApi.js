import axios from "axios";
import {VIBELY_API} from "~/app/constants.js";
import {getStoredUserData} from "~/service/accountService.js";

export const userInfoApi = async (id) => {
    let response = {};
    let user = getStoredUserData()
    try {
        response = await axios.get(`${VIBELY_API}/users/info/${id}`,
            {
                headers: {
                    Authorization: 'Bearer ' + user.accessToken
                }
            });
    } catch (e) {
        console.log("Get user info error! " + e);
    }
    return response.data;
}
export const editUserInfoApi = async (data) => {
    let response = {};
    let user = getStoredUserData()
    try {
        response = await axios.put(`${VIBELY_API}/users`, data,
            {
                headers: {
                    Authorization: 'Bearer ' + user.accessToken
                }
            }
        )
    } catch (e) {
        console.log("Edit user info error! " + e);
    }
    return response.data;
}




