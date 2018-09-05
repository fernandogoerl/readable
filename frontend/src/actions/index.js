import * as api from '../api'

export const LOAD_CATEGORIES = 'LOAD_CATEGORIES';
export const LOAD_POSTS = 'LOAD_POSTS';


export const loadCategories = (categories) => {
    return {
        type: LOAD_CATEGORIES,
        categories
    };
}

export const fetchCategories = () => (dispatch) =>
    api.getAllCategories()
        .then((categories) => dispatch(loadCategories(categories)))


export const loadAllPosts = (posts) => {
    return {
        type: LOAD_POSTS,
        posts
    };
}

export const fetchAllPosts = () => (dispatch) => {
    api.getAllPosts()
        .then((posts) => dispatch(loadAllPosts(posts)));
}