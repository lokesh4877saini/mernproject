import 
{
LOGIN_REQUEST,
LOGIN_SUCCESS,
LOGIN_FAIL,
REGISTER_REQUEST,
LOAD_USER_FAIL,
LOAD_USER_REQUEST,
LOAD_USER_SUCCESS,
REGISTER_SUCCESS,
LOGOUT_USER_SUCCESS,
LOGOUT_USER_FAIL,
REGISTER_FAIL,  
CLEAR_ERRORS
} from "../constants/userConstants";
import axios from 'axios';
const preUrl  = "http://localhost:4000"

// login
export const login = (email,password) => async(dispatch) =>{
     try {
        dispatch({type:LOGIN_REQUEST});
        const config = {headers:{"Content-Type":"application/json"}};
        const {data} = await axios.post(
            `${preUrl}/api/v1/login`,
            {email,password},
            config
        );
        localStorage.setItem("token",data.token)
         dispatch({type:LOGIN_SUCCESS,payload:data.user});
     } catch (error) {
        dispatch({type:LOGIN_FAIL,payload:error.response.data.message})
     }
}
// signup
export const register = (userData) => async(dispatch) =>{
    try {
       dispatch({type:REGISTER_REQUEST});
       const config = {headers:{"Content-Type":"multipart/form-data"}};
       const {data}= await axios.post(`${preUrl}/api/v1/register`,userData,config)
       dispatch({type:REGISTER_SUCCESS,payload:data.user });
    }
    catch(error){
        dispatch({type:REGISTER_FAIL,payload:error.response.data.message})
    }
}
// load user
export const loadUser = () => async (dispatch)=>{
    try {
        dispatch({type:LOAD_USER_REQUEST});
        const {data} = await axios.get( `${preUrl}/api/v1/me`);
         dispatch({type:LOAD_USER_SUCCESS,payload:data.user});
     } catch (error) {
        dispatch({type:LOAD_USER_FAIL,payload:error.response.data.message})
     }
}
// logout user
export const logout = () => async (dispatch)=>{
    try {
       await axios.get( `${preUrl}/api/v1/logout`);
         dispatch({type:LOGOUT_USER_SUCCESS});
     } catch (error) {
        dispatch({type:LOGOUT_USER_FAIL,payload:error.message})
     }
}
// export const loadUser = () => async (dispatch) => {
//     try {
//       dispatch({ type: LOAD_USER_REQUEST });
  
//       // ✅ Get token from localStorage
//       const token = localStorage.getItem("token");
  
//       // ✅ Send token in headers if available
//       const config = token
//         ? { headers: { Authorization: `Bearer ${token}` } }
//         : {};
  
//       const { data } = await axios.get(`${preUrl}/api/v1/me`, config);
  
//       dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
//     console.log(data);
//     } catch (error) {
//       dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
//     }
//   };
// Clearing Errors
export const ClearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};