import { combineReducers } from "redux";
import {
    LOAD_POSTS_SUCCESS,
    LOAD_CATEGORIES_SUCCESS,
} from '../actions'


function categories (state = [], action) {
    switch (action.type) {
        case LOAD_CATEGORIES_SUCCESS :
            return action.categories;
        default :
            return state;
    }
}

function posts (state = [], action) {
    switch (action.type) {
        case LOAD_POSTS_SUCCESS :
            return action.posts;
        default :
            return state;
    }
}



export default combineReducers({
    categories,
    posts,
});
