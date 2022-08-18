import axios from "axios";
import {webServiceURL} from "../App";

export const statusPending = 0;
export const statusPreparing = 1;
export const statusCancelled = 2;
export const statusSent = 3;
export const statusDone = 4;

export const getUserPendingOrders = () => {
    const params = {
        status: [statusPending],
    };

    return axios.post(
        webServiceURL + '/api/store/order/user/get', params, {withCredentials: true}
    ).then(
        response => response.data.data
    );
}

export const getUserOrders = (excludePending = false) => {
    let status;

    if (excludePending) {
        status = [statusPreparing, statusCancelled, statusSent, statusDone];
    } else {
        status = [statusPending, statusPreparing, statusCancelled, statusSent, statusDone];
    }

    const params = {
        status: status,
    };

    return axios.post(
        webServiceURL + '/api/store/order/user/get', params, {withCredentials: true}
    ).then(
        response => response.data.data
    );
}

export const cancelPendingOrder = (orderID) => {
    const params = {
        orderID: orderID,
    };

    return axios.post(
        webServiceURL + '/api/store/order/cancel', params, {withCredentials: true}
    ).then(
        response => response.data
    );
}