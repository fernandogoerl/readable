import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSinglePost, fetchPostComments } from '../actions'

import * as helpers from "../helpers";
import { FaQuoteLeft } from 'react-icons/fa';

class Post extends Component {

    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
        this.props.fetchPostComments(this.props.match.params.id);
    }

    render() {
        const { post, comments } = this.props;
        const time = helpers.timeConverter;

        return (
            <div className='post-detail'>
                {post &&
                <div className='basic-container'>
                    <h3>{post.title}</h3>
                    <h4>{post.body}</h4>
                    <h5>{`(${post.voteScore} votes)`}</h5>
                    <span className='meta-info'>{`Posted on ${time(post.timestamp).toDateString()} at ${time(post.timestamp).getHours()}:${time(post.timestamp).getMinutes()} by ${post.author}`}</span>
                </div>}
                {comments &&
                <ul>
                    {comments.map((comment) => (
                        <li className='basic-container'>
                            <h4>{comment.body}</h4>
                            <h5>{`(${comment.voteScore} votes)`}</h5>
                            <span className='meta-info'>{`Posted on ${time(comment.timestamp).toDateString()} at ${time(comment.timestamp).getHours()}:${time(comment.timestamp).getMinutes()} by ${comment.author}`}</span>
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