import React, { Component } from 'react';
import { connect } from "react-redux";


import { createNewComment } from "../actions";

import uuid from 'uuid';
import serializeForm from 'form-serialize';
import { Form, Input, Textarea, Button } from "muicss/react";

import './CommentForm.css'


class CommentForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const id = uuid();
        const timestamp = Date.now();
        const data = { id, timestamp, ...serializeForm(e.target, {hash: true}), parentId: this.props.parent.id };
        this.props.createNewComment(data);
        this.props.refresh();
        e.target.reset();

    }

    render() {
        return (
            <div className='comment-form'>
                <h3 className='center'>Add a comment</h3>
                <Form onSubmit={this.handleSubmit} className='create-post-form'>
                    <Textarea name='body' placeholder='Comment' />
                    <Input name='author' placeholder='Author' />
                    <Button color="primary">Add comment</Button>
                </Form>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        createNewComment: (data) => dispatch(createNewComment(data)),
    }
}

export default connect(null, mapDispatchToProps)(CommentForm);