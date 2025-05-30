import { ADD_TO_CART, REMOVE_TO_CART,SAVE_SHIPPING_INFO } from '../constants/CartConstants';
import axios from 'axios';
const preUrl = import.meta.env.VITE_SERVER_URL;
// Add to cart
export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`${preUrl}/api/v1/product/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product: data.product._id,
            name: data.product.name,
            price: data.product.price,
            image: data.product.image[0].url ? data.product.image[0] : null,
            stock: data.product.stock,
            quantity,
        },
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}
// remove to cart 
export const removeItemToCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: REMOVE_TO_CART,
        payload: id,
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
}

export const saveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({
        type: SAVE_SHIPPING_INFO,
        payload: data,
    });
    localStorage.setItem("shippingInfo", JSON.stringify(data));
}