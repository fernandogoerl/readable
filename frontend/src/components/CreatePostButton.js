import React, { Component } from 'react';

import { Link } from "react-router-dom";

class CreatePostButton extends Component {
    render() {
        return (
            <div className='open-search'>
                <Link to={'/post/add'}>Add a post</Link>
            </div>
        );
    }
}

export default CreatePostButton;