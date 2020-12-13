import {LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT_SUCCESS, LOGOUT_FAIL, REGISTER_SUCCESS, REGISTER_FAIL, AUTHENTICATED, UNAUTHENTICATED, GET_USER, EDIT_PROFILE} from '../actions/types';

const initialState = {
    isAuthenticated: false,
    user: null
};


export default function(state = initialState, action) {
    
    switch(action.type) {
        case LOGIN_SUCCESS:
        // case REGISTER_SUCCESS:
        case AUTHENTICATED:
        case GET_USER:
        case EDIT_PROFILE:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case LOGOUT_SUCCESS:
        case UNAUTHENTICATED:
            return {
                ...state,
                user: null,
                isAuthenticated: false
            }
        default:
            return state;
    }
}