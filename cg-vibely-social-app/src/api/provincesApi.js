import axios from "axios";
import {PROVINCES_API} from "~/app/constants.js";

export const getCitiesApi = async () => {
    let response = {};
    try{
        response = await axios.get(PROVINCES_API)
    } catch (e) {
        console.log("Get user info error! " + e);
    }
    return response;
}