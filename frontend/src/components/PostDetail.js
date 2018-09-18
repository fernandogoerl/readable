import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

import Header from "./Header";
import PostBlock from "./PostBlock";
import CommentBlock from "./CommentBlock";

import { fetchSinglePost, fetchPostComments } from '../actions'

class PostDetail extends Component {

    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
        this.props.fetchPostComments(this.props.match.params.id);
    }

    updateComments() {
        this.props.fetchPostComments(this.props.match.params.id);
    }


    render() {
        const { post, comments } = this.props;

        return (
            <div className='post-detail'>
                <Header/>
                <Link className='close-create-post' to='/'>Close</Link>
                {post && <PostBlock data={post}/>}
                {comments &&
                <ul>
                    {comments.map((comment) => (
                        <li key={comment.id}>
                            <CommentBlock data={comment} updateComments={this.updadeComments}/>
                            {/* <div className='basic-block'>
                                <div className='basic-container'>
                                    <h4>{comment.body}</h4>
                                </div>
                                <div className='meta-info'>
                                    <div>
                                        {getMetaInfo(comment)}
                                    </div>
                                    <div className='vote-score'>
                                        {` ${comment.voteScore} `}
                                        {comment.voteScore < 0
                                            ? <div className='thumb-down'> <FaThumbsDown/> </div>
                                            : <div className='thumb-up'>  <FaThumbsUp/> </div>
                                        }
                                        <div className='meta-votes'>
                                            <div className='vote-up' onClick={() => {sendVoteComment({id: comment.id, option: 'upVote'});this.updateComments()}}><FaAngleUp/></div>
                                            <div className='vote-down' onClick={() => sendVoteComment({id: comment.id, option: 'downVote'})}><FaAngleDown/></div>
                                        </div>
                                    </div>
                                    <div className='meta-edit'> <FaEdit/> </div>
                                </div>
                            </div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(PostDetail);