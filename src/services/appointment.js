import axios from "axios";
import {webServiceURL} from "../App";

export const getScheduleConfig = () => {
    return axios.post(
        webServiceURL + '/api/business/config/schedule/get', {}, {withCredentials: true}
    ).then(
        response => response.data.data
    );
}

export const getPendingAppointments = (startDate, endDate) => {
    const params = {
        status: 0,
        startDate: startDate,
        endDate: endDate,
    };

    return axios.post(
        webServiceURL + '/api/get/business/appointments', params, {withCredentials: true}
    ).then(
        response => response.data.data
    );
}

export const getPendingUserAppointments = () => {
    const params = {
        status: 0,
    };

    return axios.post(
        webServiceURL + '/api/get/user/appointments', params, {withCredentials: true}
    ).then(
        response => response.data.data
    );
}

export const bookUserAppointment = (bookingDateAt) => {
    const params = {
        bookingDateAt: bookingDateAt,
    };

    return axios.post(
        webServiceURL + '/api/book/user/appointment', params, {withCredentials: true}
    ).then(
        response => response.data
    );
}