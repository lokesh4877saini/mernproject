import {
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_REQUEST,
    CLEAR_ERRORS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
} from '../constants/productConstants'
import axios from 'axios';
export const getProduct = (keyword="",currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });
        let url = `http://localhost:4000/api/v1/products?keyword=${keyword}&page=${currentPage}`;
        const { data } = await axios.get(url);
        dispatch({
            type: ALL_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (e) {
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: e.response.data.message,
        })
    }
}


export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`http://localhost:4000/api/v1/product/${id}`);
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



// Clearing Errors



export const ClearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};