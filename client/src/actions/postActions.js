import axios from 'axios';
import {CREATE_POST, GET_PROJECT_POSTS} from './types';

export const createPost = (post) => dispatch => {
    axios.post('/post/create', post)
        .then(res => {
            dispatch({
                type: CREATE_POST,
                payload: res.data
            });
        })

}

export const getProjectPosts = (projectID) => dispatch => {
    axios.get(`/post/${projectID}/posts`)
                .then(res => {
                    dispatch({
                        type: GET_PROJECT_POSTS,
                        payload: res.data
                    });
                })  
}