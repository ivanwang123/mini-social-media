import {CREATE_PROJECT, GET_PROJECTS, GET_USER_PROJECTS, GET_CATEGORY_PROJECTS, ADD_FOLLOWER, GET_ONE_PROJECT, REMOVE_FOLLOWER, GET_TERM_PROJECTS, EDIT_PROJECT} from '../actions/types';

const initialState = {
    projectIDs: [],
    projects: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload]
            }
        case GET_PROJECTS:
        case GET_ONE_PROJECT:
        case ADD_FOLLOWER:
        case REMOVE_FOLLOWER:
        case GET_CATEGORY_PROJECTS:
        case GET_USER_PROJECTS:
        case GET_TERM_PROJECTS:
        case EDIT_PROJECT:
            return {
                ...state,
                projects: action.payload
            }
        default:
            return state;
    }
}