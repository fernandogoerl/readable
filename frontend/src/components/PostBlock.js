import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendVotePost, deletePost } from '../actions'
import { getMetaInfo } from "../helpers";

import { FaThumbsUp, FaThumbsDown, FaEdit, FaComment, FaTrash } from 'react-icons/fa';
import './BasicBlock.css'

class PostBlock extends Component {

    deleteClick = (id) => {this.props.deletePost(id);}

    sendVote = (vote) => {
        this.props.sendVotePost(vote);
    }

    confirmDelete = (id) => {
        if (window.confirm(`You are about to delete the post!`)) {
            this.props.deletePost(id);
            this.props.refresh();
        }
    }


    render() {
        const { data, withLink  } = this.props;

        const upVote = {id: data.id, option: 'upVote' };
        const downVote = {id: data.id, option: 'downVote' };
        return (
            <div className='basic-block'>
                <div className='basic-container'>
                    {withLink
                        ? <Link to={`/posts/${data.id}`}>
                            <h3>{data.title}</h3>
                        </Link>
                        : <h3>{data.title}</h3>
                    }
                    <h4>{data.body}</h4>
                </div>
                <div className='meta-info'>
                    <Link to='#'><button className='meta-icons'> <FaEdit/> </button></Link>
                    <button className='meta-icons' onClick={() => this.confirmDelete(data.id)}> <FaTrash/> </button>

                    {data.title &&
                        <div className='meta-icons'> {` ${data.commentCount} `} <FaComment/> </div>
                    }
                    <div className='meta-icons'>
                        <button className='thumb-down' onClick={() => this.sendVote(downVote)}> <FaThumbsDown/> </button>
                        {` ${data.voteScore} `}
                        <button className='thumb-up' onClick={() => this.sendVote(upVote)}> <FaThumbsUp/> </button>
                    </div>
                    <div className='meta-info-data'>
                        {getMetaInfo(data)}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        sendVotePost: (id) => dispatch(sendVotePost(id)),
        deletePost: (id) => dispatch(deletePost(id)),
    }
}
export default connect(null, mapDispatchToProps)(PostBlock)