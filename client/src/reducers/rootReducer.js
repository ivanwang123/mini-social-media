import {combineReducers} from 'redux';
import authReducer from './authReducer';
import projectReducer from './projectReducer';
import postReducer from './postReducer';

export default combineReducers({
    auth: authReducer,
    project: projectReducer,
    post: postReducer
})