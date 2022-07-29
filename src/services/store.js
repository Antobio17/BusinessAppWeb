import axios from "axios";

import {webServiceURL} from "../App";

export const getProductsData = (sort, onStock, outOfStock, categoryExclusion) => {
    const params = {
        sort: sort,
        onStock: onStock,
        outOfStock: outOfStock,
        categoryExclusion: categoryExclusion,
    };

    return axios.post(webServiceURL + '/api/store/product/get', params, {withCredentials: true}).then(
        response => 'products' in response.data.data ?  response.data.data.products : undefined
    );
}

export const getCategoriesData = () => {
    return axios.post(webServiceURL + '/api/store/category/get', {}, {withCredentials: true}).then(
        response => 'categories' in response.data.data ?  response.data.data.categories : undefined
    );
}