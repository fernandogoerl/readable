import { combineReducers } from "redux";
import * as types from '../actions/types';

import comments from './Comments';


function categories (state = [], action) {
    switch (action.type) {
        case types.LOAD_CATEGORIES :
            return action.categories;
        default :
            return state;
    }
}

function posts (state = [], action) {
    switch (action.type) {
        case types.LOAD_POSTS :
        case types.LOAD_CATEGORY_POSTS :
            return action.posts;
        default :
        return state;
    }
}

function post (state = [], action) {
    switch (action.type) {
        case types.LOAD_SINGLE_POST :
        case types.VOTE_POST_SUCCESSFUL :
        case types.CREATE_POST_SUCCESSFUL :
        case types.EDIT_POST_SUCCESSFUL :
            return action.post;
        default :
            return state;
    }
}

function comment (state = [], action) {
    switch (action.type) {
        case types.LOAD_SINGLE_COMMENT :
        case types.VOTE_COMMENT_SUCCESSFUL :
        case types.CREATE_COMMENT_SUCCESSFUL :
        case types.EDIT_COMMENT_SUCCESSFUL :
            return action.comment;
        default :
            return state;
    }
}



export default combineReducers({
    categories,
    posts,
    post,
    comments,
    comment,
});
