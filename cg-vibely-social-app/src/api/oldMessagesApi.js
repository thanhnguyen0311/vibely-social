import axios from "axios";
import {getAccessToken, getStoredUserData} from "~/service/accountService.js";
import {VIBELY_API} from "~/app/constants.js";

export const loadOldMessagesApi = async (contact, page) => {
    let response;
    const token = getAccessToken()
    const user = getStoredUserData()
    const userEmail = user.email
    try {
        response = await axios.get(VIBELY_API + `/messages?sender=${userEmail}&receiver=${contact}&page=${page}`,
            {
                headers:{
                    Authorization: 'Bearer ' + token
                }
            })
        return response;
    }catch (e){
        console.log(e.response);
        return e.response;
    }
}