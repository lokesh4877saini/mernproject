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
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    CLEAR_ERRORS,
    USER_PASSWORD_UPDATE_FAIL,
    USER_PASSWORD_UPDATE_REQUEST,
    USER_PASSWORD_UPDATE_SUCCESS,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAIL,
    FORGOT_PASSWORD_FAIL
} from "../constants/userConstants";
import axios from 'axios';
const preUrl = import.meta.env.VITE_SERVER_URL;

// login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(
            `${preUrl}/api/v1/login`,
            { email, password },
            { ...config, withCredentials: true }
        );
        dispatch({ type: LOGIN_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: error.response.data.message })
    }
}
// signup
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({ type: REGISTER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.post(`${preUrl}/api/v1/register`, userData, config)
        dispatch({ type: REGISTER_SUCCESS, payload: data.user });
    }
    catch (error) {
        dispatch({ type: REGISTER_FAIL, payload: error.response.data.message })
    }
}
// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        const { data } = await axios.get(`${preUrl}/api/v1/me`, {
            withCredentials: true,
        });
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.user });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message })
    }
}
// logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${preUrl}/api/v1/logout`);
        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_USER_FAIL, payload: error.message })
    }
}
// ProfileUpdate
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });
        const config = { headers: { "Content-Type": "multipart/form-data" } };
        const { data } = await axios.put(`${preUrl}/api/v1/me/update`,
            userData,
            { ...config, withCredentials: true })
        dispatch({ type: UPDATE_USER_SUCCESS, payload: data.success });
        if (data) {
            setTimeout(() => {
                dispatch(loadUser());
            }, 3000);
        }
    }
    catch (error) {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.message })
    }
}

// Update Password
export const updatePassword = (userData) => async (dispatch) => {
    try {
        dispatch({ type: USER_PASSWORD_UPDATE_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.put(`${preUrl}/api/v1/password/update`,
            userData,
            { ...config, withCredentials: true })
        dispatch({ type: USER_PASSWORD_UPDATE_SUCCESS, payload: data.success });
        if (data) {
            setTimeout(() => {
                dispatch(loadUser());
            }, 3000);
        }
    } catch (e) {
        dispatch({ type: USER_PASSWORD_UPDATE_FAIL, payload: e.response.data.message })
    }
}

// forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: FORGOT_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`${preUrl}/api/v1/password/forgot`,
            email,
            { ...config, withCredentials: true })
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: data.message });
    } catch (e) {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: e.response.data.message })
    }
}
//  Reset Password
export const resetPassword = (token, userData) => async (dispatch) => {
    try {
        dispatch({ type: RESET_PASSWORD_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const {data} = await axios.put(`${preUrl}/api/v1/password/reset/${token}`,
         userData, 
        { 
            ...config,
            withCredentials: true });
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data.success});
    } catch (error) {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data.message });
    }
}
// Clearing Errors
export const ClearErros = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};