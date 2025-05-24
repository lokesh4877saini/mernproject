import { CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,CLEAR_ERRORS } from "../constants/orderConstants";
import axios from "axios";
const preUrl = import.meta.env.VITE_SERVER_URL;
export const createOrder = (order)=> async(dispatch,getState) =>{
    try {
        dispatch({type:CREATE_ORDER_REQUEST});
        const config = {
            headers: {
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          };
    
          const { data } = await axios.post(`${preUrl}/api/v1/order/new`, order, config);
          dispatch({type:CREATE_ORDER_SUCCESS,payload:data})
    } catch (error) {
        dispatch({ type: CREATE_ORDER_FAIL, payload: error.message });
    }
}
export const ClearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};