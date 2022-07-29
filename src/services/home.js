import axios from "axios";

import {webServiceURL} from "../App";

export const getHomeData = () => {
    return axios.post(
        webServiceURL + '/api/business/config/home/get', {}, {withCredentials: true}
    ).then(
        response => response.data.data
    );
}