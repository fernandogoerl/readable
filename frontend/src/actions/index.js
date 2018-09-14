import * as api from '../api'
import * as types from './types'


// CATEGORIES ACTIONS

export const loadCategories = (categories) => ({
        type: types.LOAD_CATEGORIES,
        categories
    });

export const fetchCategories = () => (dispatch) =>
    api.getAllCategories()
        .then((categories) => dispatch(loadCategories(categories)));


// POSTS ACTIONS

export const loadPosts = (posts) => ({
        type: types.LOAD_POSTS,
        posts,
    });

export const fetchAllPosts = () => (dispatch) =>
    api.getAllPosts()
        .then((posts) => dispatch(loadPosts(posts)));

export const loadCategoryPosts = (posts) => ({
        type: types.LOAD_CATEGORY_POSTS,
        posts,
    });

export const fetchCategoryPosts = (category) => (dispatch) =>
    api.getCategoryPosts(category)
        .then((posts) => dispatch(loadCategoryPosts(posts)));

export const loadSinglePost = (post) => ({
        type: types.LOAD_SINGLE_POST,
        post,
    });

export const fetchSinglePost = (id) => (dispatch) =>
    api.getSinglePost(id)
        .then((post) => dispatch(loadSinglePost(post)));

        
// COMMENTS ACTIONS

export const loadPostComments = (comments) => ({
        type: types.LOAD_POST_COMMENTS,
        comments,
    });

export const fetchPostComments = (id) => (dispatch) =>
    api.getPostComments(id)
        .then((comments) => dispatch(loadPostComments(comments)));
