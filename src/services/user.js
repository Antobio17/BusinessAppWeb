import axios from "axios";
import {webServiceURL} from "../App";

export const getUserData = () => {
    return axios.post(webServiceURL + '/api/get/user/data', {}, {withCredentials: true}).then(
        response => response.data.data
    );
}

export const getPostalAddresses = () => {
    return axios.post(webServiceURL + '/api/get/user/postalAddresses', {}, {withCredentials: true}).then(
        response => response.data.data
    );
}

export const setPostalAddress = (id, name, address, postalCode, population, province, state) => {
    const params = {
        postalAddressID: id,
        name: name,
        address: address,
        postalCode: postalCode,
        population: population,
        province: province,
        state: state,
    }

    return axios.post(webServiceURL + '/api/user/create/address', params, {withCredentials: true}).then(
        response => response.data.data
    );
}

export const updateUserData = (email, name, surname, phoneNumber, password) => {
    const params = {
        email: email,
        name: name,
        surname: surname,
        phoneNumber: phoneNumber,
        password: password,
    }

    return axios.post(webServiceURL + '/api/user/update', params, {withCredentials: true}).then(
        response => response.data
    );
}