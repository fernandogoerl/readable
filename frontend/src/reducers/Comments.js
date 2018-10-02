import * as types from '../actions/types';

export default function comments (state = [], action) {
    switch (action.type) {
        case types.LOAD_POST_COMMENTS :
            return action.comments;
        case types.DELETE_COMMENT_SUCCESSFUL :
            return state.filter((comment) => comment.id !== action.id);
        default :
            return state;
    }
}