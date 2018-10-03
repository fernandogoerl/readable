import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { FaPlus } from 'react-icons/fa';

class CreatePostButton extends Component {
    render() {
        return (
            // <div className='open-search'>
            //     <Link to={'/post/add'}>Add a post</Link>
            // </div>
            <div className='open-search'>
                <Link to={'/createNewPost'}><FaPlus/></Link>
            </div>
        );
    }
}

export default CreatePostButton;