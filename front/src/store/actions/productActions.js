import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    ADMIN_NEW_PRODUCT_REQUEST,
    ADMIN_NEW_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_REQUEST,
    ADMIN_DELETE_PRODUCT_SUCCESS,
    ADMIN_DELETE_PRODUCT_FAIL,
    ADMIN_UPDATE_PRODUCT_REQUEST,
    ADMIN_UPDATE_PRODUCT_SUCCESS,
    ADMIN_UPDATE_PRODUCT_FAIL,
    ADMIN_NEW_PRODUCT_FAIL,
    NEW_REVIEW_FAIL,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'
import axios from 'axios';
const preUrl = import.meta.env.VITE_SERVER_URL;
axios.defaults.withCredentials = true
export const getProduct = (keyword = "", currentPage = 1, price = [0, 250000], category, ratings = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let url = `${preUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
        if (category) {
            url = `${preUrl}/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings} `;
        }
        const { data } = await axios.get(url);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (e) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: e.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`${preUrl}/api/v1/product/${id}`);
        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data.product,
        })
    } catch (e) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: e.response.data.message,
        })
    }
}

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        }
        const { data } = await axios.put(`${preUrl}/api/v1/review`, reviewData, config);
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (e) {
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: e.response.data.message,
        })
    }
}

// Admin

export const newProductByAdmin = (prodcutData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_NEW_PRODUCT_REQUEST });
        const config = {
            headers: {
                headers: { "Content-Type": "multipart/form-data" }
            },
            withCredentials: true,
        };
        const { data } = await axios.post(`${preUrl}/api/v1/admin/product/new`, prodcutData, config);
        dispatch({
            type: ADMIN_NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (e) {
        dispatch({
            type: ADMIN_NEW_PRODUCT_FAIL,
            payload: e.response.data.message,
        })
    }
}
export const updateProductByAdmin = (id,prodcutData) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_PRODUCT_REQUEST});
        const config = {
            headers: {
                headers: { "Content-Type": "multipart/form-data" }
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`${preUrl}/api/v1/admin/product/${id}`, prodcutData, config);
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (e) {
        dispatch({
            type: ADMIN_UPDATE_PRODUCT_FAIL,
            payload: e.response.data.message,
        })
    }
}

export const getAllProductsForAdmin = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.get(`${preUrl}/api/v1/admin/products`, config);
        dispatch({
            type: ADMIN_PRODUCT_SUCCESS,
            payload: data.products,
        })
    } catch (e) {
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: e.response.data.message,
        })
    }
}
export const deleteProductByAdmin = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_PRODUCT_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.delete(`${preUrl}/api/v1/admin/product/${id}`, config);
        dispatch({
            type: ADMIN_DELETE_PRODUCT_SUCCESS,
            payload: data.success,
        })
    } catch (e) {
        dispatch({
            type: ADMIN_DELETE_PRODUCT_FAIL,
            payload: e.response.data.message,
        })
    }
}
// Clearing Errors



export const ClearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};