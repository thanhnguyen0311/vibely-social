import axios from "axios";
import {VIBELY_API} from "~/app/constants.js";
import {getAccessToken} from "~/service/accountService.js";

export const findSuggestionFriendsApi = async () => {
    let result = null;
    try {
        result = await axios.get(`${VIBELY_API}/users/suggestion_friends`,{
            headers:{
                Authorization: `Bearer ${getAccessToken()}`
            }
        });
    } catch (e) {
        console.log("Find suggestion friends API error: " + e);
    }
    return result;
};
  