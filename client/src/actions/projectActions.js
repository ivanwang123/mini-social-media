import axios from 'axios';
import {CREATE_PROJECT, GET_PROJECTS, GET_USER_PROJECTS, GET_CATEGORY_PROJECTS, ADD_FOLLOWER, GET_ONE_PROJECT, REMOVE_FOLLOWER, GET_TERM_PROJECTS, EDIT_PROJECT} from './types';

export const getProjects = () => dispatch => {
    return axios.get('/project')
        .then(res => dispatch({
            type: GET_PROJECTS,
            payload: res.data
        }))
}

export const getOneProject = (username, project) => dispatch => {
    return axios.get(`/project/${username}/projects/${project}`)
        .then(res => dispatch({
            type: GET_ONE_PROJECT,
            payload: res.data
        }))
}

export const getUserProjects = (username) => dispatch => {
    return axios.get(`/project/${username}/projects`)
        .then(res => dispatch({
            type: GET_USER_PROJECTS,
            payload: res.data
        }))
}

export const getCategoryProjects = (category) => dispatch => {
    return axios.get(`/project/category/${category}`)
        .then(res => dispatch({
            type: GET_CATEGORY_PROJECTS,
            payload: res.data
        }))
}

export const getTermProjects = (term) => dispatch => {
    return axios.get(`/project/search/${term}`)
        .then(res => dispatch({
            type: GET_TERM_PROJECTS,
            payload: res.data
        }))
}

export const createProject = (project) => dispatch => {
    axios.post('/project/create', project)
        .then(res => {
            dispatch({
                type: CREATE_PROJECT,
                payload: res.data
            });
        })       
}

export const addFollower = (projectID, user) => dispatch => {
    return axios.put('/project/follower/follow', {projectID, user})
        .then(res => {
            dispatch({
                type: ADD_FOLLOWER,
                payload: res.data
            })
        });
}

export const removeFollower = (projectID, user) => dispatch => {
    return axios.put('/project/follower/unfollow', {projectID, user})
        .then(res => {
            dispatch({
                type: REMOVE_FOLLOWER,
                payload: res.data
            })
        });
}

export const editProject = ({projectID, description}) => dispatch => {
    return axios.put(`/project/${projectID}/edit`, {description})
        .then(res => {
            dispatch({
                type: EDIT_PROJECT,
                payload: res.data
            });
            return true
        })
        .catch(err => {
            return false
        })
}