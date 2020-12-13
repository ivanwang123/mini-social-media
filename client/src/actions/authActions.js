import axios from 'axios';
import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, AUTHENTICATED, UNAUTHENTICATED, GET_USER, EDIT_PROFILE} from './types';

export const register = ({username, password}) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username, password});

    return axios.post('/user/register', body, config)
        .then(res => {
            dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
            });
            return true;
        })
        .catch(err => {
            // dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
            return false;
        });
}

export const login = ({ username, password }) => dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({username, password});

    return axios.post('/user/login', body, config)
        .then(res => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            return true;
        })
        .catch(err => {
            dispatch({
                type: LOGIN_FAIL
            });
            return false;
        });
}

export const logout = () => dispatch => {
    return axios.get('/user/logout')
        .then(res => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        })
        .catch(err => {
            dispatch({
                type: LOGOUT_SUCCESS
            })
        });
}

export const authenticated = () => dispatch => {
    return axios.get('/user/authenticated')
        .then(res => {
            dispatch({
                type: AUTHENTICATED,
                payload: res.data
            });
            return true;
        })
        .catch(err => {
            dispatch({
                type: UNAUTHENTICATED
            });
            return false;
        });
}

export const getUser = (name) => dispatch => {
    return axios.get(`/user/${name}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data
            })
            return res.data;
        })
        .catch(err => {
            return null;
        });
}

export const editProfile = (data) => dispatch => {
    const {user, formData} = data;

    return axios.put(`/user/${user}/edit`, formData)
        .then(res => {
            dispatch({
                type: EDIT_PROFILE,
                payload: res.data
            });
            return true
        })
        .catch(err => {
            return false
        })
}