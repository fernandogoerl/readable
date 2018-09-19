import * as api from '../api'
import * as types from './types'


// CATEGORIES ACTIONS

export const loadCategories = (categories) => ({
    type: types.LOAD_CATEGORIES,
    categories
});

export const fetchCategories = () => (dispatch) => {
    api.getAllCategories()
        .then((categories) => dispatch(loadCategories(categories)))
};


// POSTS ACTIONS

export const loadPosts = (posts) => ({
    type: types.LOAD_POSTS,
    posts,
});

export const fetchAllPosts = () => (dispatch) => {
    api.getAllPosts()
        .then((posts) => dispatch(loadPosts(posts)))
};

export const loadCategoryPosts = (posts) => ({
    type: types.LOAD_CATEGORY_POSTS,
    posts,
});

export const fetchCategoryPosts = (category) => (dispatch) => {
    api.getCategoryPosts(category)
        .then((posts) => dispatch(loadCategoryPosts(posts)))
};

export const loadSinglePost = (post) => ({
    type: types.LOAD_SINGLE_POST,
    post,
});

export const fetchSinglePost = (id) => (dispatch) => {
    api.getSinglePost(id)
        .then((post) => dispatch(loadSinglePost(post)))
};

export const createPostSuccessful = (post) => ({
    type: types.CREATE_POST_SUCCESSFUL,
    post,
});

export const createNewPost = (data) => (dispatch) => {
    api.addNewPost(data)
        .then((post) => dispatch(createPostSuccessful(post)))
        .then(() => dispatch(fetchAllPosts()));
};


// COMMENTS ACTIONS

export const loadPostComments = (comments) => ({
    type: types.LOAD_POST_COMMENTS,
    comments,
});

export const fetchPostComments = (id) => (dispatch) => {
    api.getPostComments(id)
        .then((comments) => dispatch(loadPostComments(comments)))
};

export const loadSingleComment = (comment) => ({
    type: types.LOAD_SINGLE_COMMENT,
    comment,
});

export const fetchSingleComment = (id) => (dispatch) => {
    api.getSingleComment(id)
        .then((comment) => dispatch(loadSingleComment(comment)))
};

export const createCommentSuccessful = (comment) => ({
    type: types.CREATE_COMMENT_SUCCESSFUL,
    comment,
});

export const createNewComment = (data) => (dispatch) => {
    api.addNewComment(data)
        .then((post) => dispatch(createCommentSuccessful(post)))
};


// VOTING ACTIONS

export const votePostSuccessful = (post) => ({
    type: types.VOTE_POST_SUCCESSFUL,
    post,
});

export const sendVotePost = (postData) => (dispatch) => {
    api.votePost(postData)
        .then((post) => dispatch(votePostSuccessful(post)))
        .then(() => dispatch(fetchAllPosts()));
};

export const voteCommentSuccessful = (comment) => ({
    type: types.VOTE_COMMENT_SUCCESSFUL,
    comment,
});

export const sendVoteComment = (commentData) => (dispatch) => {
    api.voteComment(commentData)
        .then((comment) => dispatch(voteCommentSuccessful(comment)));

};


// DELETE ACTIONS

export const deletePostSuccessful = (post) => ({
    type: types.DELETE_POST_SUCCESSFUL,
    post,
});

export const deletePost = (id) => (dispatch) => {
    api.disablePost(id)
        .then((post) => dispatch(deletePostSuccessful(post)))
        .then(() => dispatch(fetchAllPosts()));
};

export const deleteCommentSuccessful = (comment) => ({
    type: types.DELETE_COMMENT_SUCCESSFUL,
    comment,
});

export const deleteComment = (id) => (dispatch) => {
    api.disableComment(id)
        .then((comment) => dispatch(deleteCommentSuccessful(comment)));
};