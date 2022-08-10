import axios from "axios";
import {webServiceURL} from "../App";

export const login = (email, password) => {
    const params = {
        email: email,
        password: password,
    };

    return axios.post(webServiceURL + '/api/signin', params, {withCredentials: true}).then(
        response => response.data
    );
}

export const isLoggedIn = () => {
    return document.cookie.match(/^(.*;)?\s*jwt_hp\s*=\s*[^;]+(.*)?$/) !== null;
};

export const logout = () => {
    document.cookie = 'jwt_hp=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.location.href = '/';
};