import axios from "axios";
import {webServiceURL} from "../App";

export const statusPending = 0;
export const statusCancelled = 1;
export const statusDone = 2;

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

export const getUserPendingAppointments = () => {
    return getUserAppointments(0);
}

export const getUserAppointments = (status) => {
    const params = {
        status: status,
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

export const cancelUserBookedAppointment = (userEmail) => {
    const params = {
        userEmail: userEmail,
    };

    return axios.post(
        webServiceURL + '/api/cancel/book/user/appointment', params, {withCredentials: true}
    ).then(
        response => response.data
    );
}