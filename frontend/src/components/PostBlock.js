import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchSingleComment, sendVotePost, sendVoteComment } from '../actions'
import { getMetaInfo } from "../helpers";

import { FaThumbsUp, FaThumbsDown, FaAngleUp, FaAngleDown, FaEdit, FaComment } from 'react-icons/fa';
import './BasicBlock.css'

class PostBlock extends Component {

    render() {
        const { data, withLink, sendVotePost  } = this.props;

        const upVote = {id: data.id, option: 'upVote' };
        const downVote = {id: data.id, option: 'downVote' };
        return (
            <div className='basic-block'>
                <div className='basic-container'>
                    {data.title && withLink
                        ? <Link to={`/posts/${data.id}`}>
                            <h3>{data.title}</h3>
                        </Link>
                        : <h3>{data.title}</h3>
                    }
                    <h4>{data.body}</h4>
                </div>
                <div className='meta-info'>
                    <div>
                        {getMetaInfo(data)}
                    </div>

                    {data.title &&
                        <div className='comment-count'> {` ${data.commentCount} `} <FaComment/> </div>
                    }
                    <div className='vote-score'>
                        {` ${data.voteScore} `}
                        {data.voteScore < 0
                            ? <div className='thumb-down'> <FaThumbsDown/> </div>
                            : <div className='thumb-up'>  <FaThumbsUp/> </div>
                        }
                        <div className='meta-votes'>
                            <div className='vote-up' onClick={() => sendVotePost(upVote)}><FaAngleUp/></div>
                            <div className='vote-down' onClick={() => sendVotePost(downVote)}><FaAngleDown/></div>
                        </div>
                    </div>
                    <div className='meta-edit'> <FaEdit/> </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        post: state.post,
        comment: state.comment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleComment: (id) => dispatch(fetchSingleComment(id)),
        sendVotePost: (id) => dispatch(sendVotePost(id)),
        sendVoteComment: (id) => dispatch(sendVoteComment(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(PostBlock)