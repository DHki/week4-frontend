import { ALL_USERS_FAIL, ALL_USERS_REQUEST, ALL_USERS_SUCCESS, CLEAR_ERRORS, FOLLOW_USER_FAIL, FOLLOW_USER_REQUEST, FOLLOW_USER_SUCCESS, FORGOT_PASSWORD_FAIL, FORGOT_PASSWORD_REQUEST, FORGOT_PASSWORD_SUCCESS, LOAD_USER_FAIL, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER_FAIL, LOGOUT_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, RESET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, UPDATE_PASSWORD_FAIL, UPDATE_PASSWORD_REQUEST, UPDATE_PASSWORD_SUCCESS, UPDATE_PROFILE_FAIL, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS } from "../constants/userConstants";
import axios from 'axios';
import { Cookies } from 'react-cookie';

// Login User
export const loginUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOGIN_USER_REQUEST });

        window.location.href = 'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=3407bf71c6f6be482b518366e128d6d7&redirect_uri=https://spirit-xi.vercel.app/login'
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error.response.data.message,
        });
    }
}

// kakao login success !!
export const loginSuccess = (payload) => async (dispatch) => {

    try {
        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: payload
        });
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error
        });

        window.location.href = '/intro';
    }
}

export const loginInitial = (token) => async (dispatch) => {
    try {
        console.log(token);
        dispatch({ type: LOGIN_USER_REQUEST });
        const config = {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
        };
        const { data } = await axios.post("https://madcamp.dhki.kr/users/token", { token: token }, config);
        console.log(data.user.avatar);

        dispatch({
            type: LOGIN_USER_SUCCESS,
            payload: data.user
        });
    } catch (error) {
        dispatch({
            type: LOGIN_USER_FAIL,
            payload: error
        });

        window.location.href = '/intro';
    }
}

// Register User
export const registerUser = (userData) => async (dispatch) => {
    try {

        dispatch({ type: REGISTER_USER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }

        const { data } = await axios.post(
            '/api/v1/signup',
            userData,
            config
        );

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Load User
export const loadUser = () => async (dispatch) => {
    try {

        dispatch({ type: LOAD_USER_REQUEST });
        const cookie = new Cookies();
        const { data } = await axios.post('https://madcamp.dhki.kr/users/token', {token: cookie.get('token')});

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Logout User
export const logoutUser = () => async (dispatch) => {
    try {
        // await axios.get('/api/v1/logout');
        dispatch({ type: LOGOUT_USER_SUCCESS });
    } catch (error) {
        dispatch({
            type: LOGOUT_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

// Get User Details
export const getUserDetails = (username) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/v1/user/${username}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get User Details By ID
export const getUserDetailsById = (userId) => async (dispatch) => {
    try {

        dispatch({ type: USER_DETAILS_REQUEST });
        const { data } = await axios.get(`https://madcamp.dhki.kr/users/detail/id/${userId}`);

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user,
        });

    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Get Suggested Users
export const getSuggestedUsers = () => async (dispatch) => {
    try {

        dispatch({ type: ALL_USERS_REQUEST });

        setTimeout(async () => {
            const { data } = await axios.get('/api/v1/users/suggested');

            dispatch({
                type: ALL_USERS_SUCCESS,
                payload: data.users,
            });
        }, 600);

    } catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Follow | Unfollow User
export const followUser = ({userId, token}) => async (dispatch) => {
    try {
        console.log(`my token: ${token}`);
        dispatch({ type: FOLLOW_USER_REQUEST });
        const { data } = await axios.post(`https://madcamp.dhki.kr/users/follow/${userId}`, {token: token}, {headers: {'Content-Type' : 'application/json'}});

        dispatch({
            type: FOLLOW_USER_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: FOLLOW_USER_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.post(
            '/api/v1/password/forgot',
            { email },
            config
        );

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message,
        });

    } catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Reset Password
export const resetPassword = (token, password) => async (dispatch) => {
    try {

        dispatch({ type: RESET_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }

        const { data } = await axios.put(
            `/api/v1/password/reset/${token}`,
            { password },
            config
        );

        dispatch({
            type: RESET_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: RESET_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Profile
export const updateProfile = (userData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PROFILE_REQUEST });

        const { data } = await axios.put('https://madcamp.dhki.kr/users/update', userData);

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Update User Password
export const updatePassword = (passwords) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_PASSWORD_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        }
        const { data } = await axios.put(
            '/api/v1/update/password',
            passwords,
            config
        );

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear All Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};