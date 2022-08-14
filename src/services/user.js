import axios from "axios";
import {webServiceURL} from "../App";

export const getUserData = () => {
    return axios.post(webServiceURL + '/api/get/user/data', {}, {withCredentials: true}).then(
        response => response.data.data
    );
}