import axios from "axios";
import {VIBELY_API} from "~/app/constants.js";

export const getStatus = async (friendEmails) => {
    let result = null;
    try {
        result = await axios.post(
            `${VIBELY_API}/friends/status`,
            friendEmails,
        );
    } catch (e) {
        console.log('Get status error!')
        console.log(e);
    }
    return result;
};