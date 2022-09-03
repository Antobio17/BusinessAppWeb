import axios from "axios";
import {webServiceURL} from "../App";

export const statusPending = 0;
export const statusPaid = 1;
export const statusPreparing = 2;
export const statusCancelled = 3;
export const statusSent = 4;
export const statusDone = 5;

export const getUserPendingOrders = () => {
    const params = {
        status: [statusPaid],
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
        status = [statusPaid, statusPreparing, statusCancelled, statusSent, statusDone];
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

export const notifyNewOrder = (postalAddressID, amount, productsData) => {
    const params = {
        postalAddressID: postalAddressID,
        amount: amount,
        productsData: productsData,
    };

    return axios.post(
        webServiceURL + '/api/store/order/create', params, {withCredentials: true}
    ).then(
        response => response.data
    );
}

export const notifyPaymentOrder = (paymentIntentID, success = true) => {
    const params = {
        paymentIntentID: paymentIntentID,
        success: success,
    };

    return axios.post(
        webServiceURL + '/api/store/order/payment', params, {withCredentials: true}
    ).then(
        response => response.data
    );
};

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