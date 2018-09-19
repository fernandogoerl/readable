import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom'

import { sendVoteComment, deleteComment } from '../actions'
import { getMetaInfo } from '../helpers';

import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import './BasicBlock.css'

class CommentBlock extends Component {

    sendVote = (comment, vote) => {
        this.props.sendVoteComment(vote);
        this.props.refresh();
        
    }

    confirmDelete = (id) => {
        if (window.confirm('You are about to delete this comment!')) {
            this.props.deleteComment(id);
            this.props.refresh();
        }
    }

    render() {

        const { data } = this.props;

        const upVote = {id: data.id, option: 'upVote' };
        const downVote = {id: data.id, option: 'downVote' };

        return (
            <div className='basic-block'>
                <div className='basic-container'>
                    <h4>{data.body}</h4>
                </div>
                <div className='meta-info'>
                    <Link to='#'><button className='meta-icons'> <FaEdit/> </button></Link>
                    <button className='meta-icons' onClick={() => this.confirmDelete(data.id)}> <FaTrash/> </button>
                    <div className='meta-icons'>
                        <button className='thumb-down' onClick={(e) => this.sendVote(data, downVote)}> <FaThumbsDown/> </button>
                        {` ${data.voteScore} `}
                        <button className='thumb-up' onClick={(e) => this.sendVote(data, upVote)}> <FaThumbsUp/> </button>
                    </div>
                    <div className='meta-info-data'>
                        {getMetaInfo(data)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        comment: state.comment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendVoteComment: (id) => dispatch(sendVoteComment(id)),
        deleteComment: (id) => dispatch(deleteComment(id)),
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentBlock))