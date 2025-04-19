import {ADD_TO_CART} from  '../constants/CartConstants';
import axios from 'axios';
const preUrl  = import.meta.env.VITE_SERVER_URL;
console.log(preUrl);
export const addItemsToCart = (id,quantity) => async (dispatch,getState)=>{
    const {data} = await axios.get(`${preUrl}/api/v1/product/${id}`);
    dispatch({
        type:ADD_TO_CART,
        payload:{
            product:data.product._id,
            name:data.product.name,
            price:data.product.price,
            image:data.product.image[0].url ? data.product.image[0]:null,
            stock:data.product.stock,
            quantity,
        },
    })
  localStorage.setItem("cartItems",JSON.stringify(getState().cart.cartItems));
}