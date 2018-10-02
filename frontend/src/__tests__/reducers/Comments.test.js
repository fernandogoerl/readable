import * as types from '../../actions/types';
import reducer from '../../reducers/Comments';


describe('categories reducer', () => {
    it('should return comments', () => {
        const comments = [];
        expect(reducer([], {
            type: types.LOAD_POST_COMMENTS,
            comments
        })).toMatchSnapshot();
    });
});