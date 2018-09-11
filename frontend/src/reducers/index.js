import { combineReducers } from "redux";
import * as types from '../actions/types'


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



export default combineReducers({
    categories,
    posts,
});
