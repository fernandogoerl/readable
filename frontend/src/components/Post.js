import React, { Component } from 'react';
import { connect } from 'react-redux';

import BasicBlock from "../components/BasicBlock";

import { fetchSinglePost, fetchPostComments } from '../actions'

class Post extends Component {

    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
        this.props.fetchPostComments(this.props.match.params.id);
    }

    render() {
        const { post, comments } = this.props;

        return (
            <div className='post-detail'>
                {post && <BasicBlock data={post}/>}
                {comments &&
                <ul>
                    {comments.map((comment) => (
                        <li>
                            <BasicBlock data={comment}/>
                        </li>
                    ))}
                </ul>}
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps) => {
	return {
        post: state.post,
        comments: state.comments,
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSinglePost: (id) => dispatch(fetchSinglePost(id)),
        fetchPostComments: (id) => dispatch(fetchPostComments(id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);