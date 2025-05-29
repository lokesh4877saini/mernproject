import {
    CREATE_ORDER_REQUEST,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    MY_ORDER_FAIL,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL, CLEAR_ERRORS
} from "../constants/orderConstants";
import axios from "axios";
const preUrl = import.meta.env.VITE_SERVER_URL;
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const { data } = await axios.post(`${preUrl}/api/v1/order/new`, order, config);
        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.response.data.message });
    }
}
export const myOrder = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDER_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };

        const { data } = await axios.get(`${preUrl}/api/v1/orders/me`, config);
        dispatch({ type: MY_ORDER_SUCCESS, payload: data.orders })
    } catch (error) {
        dispatch({ type: MY_ORDER_FAIL, payload: error.response.data.message });
    }
}
export const orderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
        };
        const { data } = await axios.get(`${preUrl}/api/v1/order/${id}`, config);
        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order })
    } catch (error) {
        dispatch({ type: ORDER_DETAILS_FAIL, payload: error.response.data.message });
    }
}

export const ClearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};