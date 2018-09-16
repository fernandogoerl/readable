import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchSingleComment, sendVoteComment } from '../actions'
import { getMetaInfo } from "../helpers";

import { FaThumbsUp, FaThumbsDown, FaAngleUp, FaAngleDown, FaEdit } from 'react-icons/fa';
import './BasicBlock.css'

class CommentBlock extends Component {

    componentDidMount() {
        this.props.fetchSingleComment(this.props.data.id)
    }

    sendVote(comment, vote){
        this.props.sendVoteComment(vote);
        (vote.option === 'upVote') ? comment.voteScore++ : comment.voteScore--;
        console.log(comment);
    }

    render() {
        console.log(this.props);

        const { data } = this.props;

        const upVote = {id: data.id, option: 'upVote' };
        const downVote = {id: data.id, option: 'downVote' };

        return (
            <div className='basic-block'>
                <div className='basic-container'>
                    <h4>{data.body}</h4>
                </div>
                <div className='meta-info'>
                    <div>
                        {getMetaInfo(data)}
                    </div>
                    <div className='vote-score'>
                        {` ${data.voteScore} `}
                        {data.voteScore < 0
                            ? <div className='thumb-down'> <FaThumbsDown/> </div>
                            : <div className='thumb-up'>  <FaThumbsUp/> </div>
                        }
                        <div className='meta-votes'>
                            <div className='vote-up' onClick={() => this.sendVote(data, upVote)}><FaAngleUp/></div>
                            <div className='vote-down' onClick={() => this.sendVote(data, downVote)}><FaAngleDown/></div>
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
        comment: state.comment,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleComment: (id) => dispatch(fetchSingleComment(id)),
        sendVoteComment: (id) => dispatch(sendVoteComment(id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CommentBlock)