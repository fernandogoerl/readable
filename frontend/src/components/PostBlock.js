import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { sendVotePost, deletePost } from '../actions'
import { getMetaInfo } from '../helpers';


import { FaThumbsUp, FaThumbsDown, FaEdit, FaComment, FaTrash } from 'react-icons/fa';

class PostBlock extends Component {

    state = {
        triggerRedirect: false,
    }

    deleteClick = (id) => {this.props.deletePost(id);}

    sendVote = (vote) => {
        this.props.sendVotePost(vote);
        setTimeout(() => {this.props.refresh()}, 50);
    }

    confirmDelete = (id) => {
        if (window.confirm(`You are about to delete the post!`)) {
            this.props.deletePost(id);
            // setTimeout(() => {this.props.refresh()}, 50);
            this.setState({triggerRedirect: true});
        }
    }

    render() {
        const { data, withLink, openModal  } = this.props;

        if(this.state.triggerRedirect === true){
            return <Redirect to='/'/>
        }

        if(this.props.data.id === undefined){
            return <Redirect to='/'/>
        }

        const upVote = {id: data.id, option: 'upVote' };
        const downVote = {id: data.id, option: 'downVote' };
        return (
            <div className='basic-block'>
                <div className='basic-container'>
                    {withLink
                        ? <Link to={`/${data.category}/${data.id}`}>
                            <h3 className='post-title'>{data.title}</h3>
                        </Link>
                        : <h3>{data.title}</h3>
                    }
                    <h4>{data.body}</h4>
                </div>
                <div className='meta-info'>
                    <button className='meta-icons' onClick={() => openModal(data)}> <FaEdit/> </button>
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