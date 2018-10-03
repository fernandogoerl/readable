import React, { Component } from 'react';
import { connect } from 'react-redux';

import { sendVoteComment, deleteComment } from '../actions'
import { getMetaInfo } from '../helpers';

import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';

class CommentBlock extends Component {

    sendVote = (comment, vote) => {
        this.props.sendVoteComment(vote);
        this.props.refresh();

    }

    confirmDelete = (id) => {
        if (window.confirm('You are about to delete this comment!')) {
            this.props.deleteComment(id);
            setTimeout(() => {this.props.refresh()}, 50);
        }
    }

    render() {

        const { data, openModal } = this.props;

        const upVote = {id: data.id, option: 'upVote' };
        const downVote = {id: data.id, option: 'downVote' };

        return (
            <div className='basic-block'>
                <div className='basic-container'>
                    <h4>{data.body}</h4>
                </div>
                <div className='meta-info'>
                    <button className='meta-icons' onClick={() => openModal(data)}> <FaEdit/> </button>
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
export default connect(mapStateToProps, mapDispatchToProps)(CommentBlock)