import * as api from '../api'
import * as types from './types'


export const loadCategories = (categories) => {
    return {
        type: types.LOAD_CATEGORIES,
        categories
    };
};

export const fetchCategories = () => (dispatch) =>
    api.getAllCategories()
        .then((categories) => dispatch(loadCategories(categories)));

export const loadPosts = (posts) => {
    return {
        type: types.LOAD_POSTS,
        posts,
    };
};

export const fetchAllPosts = () => (dispatch) => {
    api.getAllPosts()
    .then((posts) => dispatch(loadPosts(posts)));
};

export const loadCategoryPosts = (posts) => {
    console.log(`loadCategoryPosts ${posts}`);

    return {
        type: types.LOAD_CATEGORY_POSTS,
        posts,
    };
};

export const fetchCategoryPosts = (category) => (dispatch) => {
    console.log(`fetchCategoryPosts ${category}`);

    api.getCategoryPosts(category)
        .then((posts) => dispatch(loadCategoryPosts(posts)));
};