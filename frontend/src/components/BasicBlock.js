import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getMetaInfo } from "../helpers";

import { FaThumbsUp, FaThumbsDown, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import './BasicBlock.css'

class BasicBlock extends Component {

    render() {
        const { data, withLink } = this.props;
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
                    {data.voteScore < 0
                    ? <div className='vote-score thumb-down'>{`${data.voteScore}`} <FaThumbsDown/> <div className='vote-links'><FaAngleUp/> <FaAngleDown/></div></div>
                    : <div className='vote-score thumb-up'>{`${data.voteScore}`} <FaThumbsUp/> <div className='vote-links'><FaAngleUp/> <FaAngleDown/></div></div>}
                </div>
            </div>
        );
    }
}

export default BasicBlock;