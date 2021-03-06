import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSinglePost, fetchPostComments } from '../actions'
import { orderComments } from '../helpers'

import Header from '../components/Header';
import PostBlock from '../components/PostBlock';
import CommentBlock from '../components/CommentBlock';
import CommentForm from '../components/CommentForm';

import { FaArrowLeft } from 'react-icons/fa'

class PostDetail extends Component {

    componentDidMount() {
        this.props.fetchSinglePost(this.props.match.params.id);
        this.props.fetchPostComments(this.props.match.params.id);
    }

    refresh = () => {
        this.props.fetchSinglePost(this.props.match.params.id);
        setTimeout(() => {this.props.fetchPostComments(this.props.match.params.id)}, 50);
    }


    render() {
        const { post, comments, location, match, openModal } = this.props;

        const orderedComments = orderComments(comments, 'timestamp')

        return (
            <div className='post-detail'>
                <Header url={{location, match}} />
                <Link className='close-create-post' to='/'><FaArrowLeft/></Link>
                <PostBlock data={post} openModal={openModal} refresh={this.refresh} />
                {orderedComments && (orderedComments.length > 0)
                    ? <ul>
                        {orderedComments.map((comment) => (
                            <li key={comment.id}>
                                <CommentBlock data={comment} refresh={this.refresh} openModal={openModal}/>
                            </li>
                        ))}
                    </ul>
                    : <h3 className='error-404'>{`No comments in this post yet.`}</h3>
                }
                <CommentForm parent={post} refresh={this.refresh}/>
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