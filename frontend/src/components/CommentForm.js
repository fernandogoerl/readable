import React, { Component } from 'react';
import { connect } from 'react-redux';


import { createNewComment } from '../actions';

import uuid from 'uuid';
import serializeForm from 'form-serialize';
import { Form, Input, Button } from 'muicss/react';

import './CommentForm.css'


class CommentForm extends Component {

    handleSubmit = (e) => {
        e.preventDefault()
        const id = uuid();
        const timestamp = Date.now();
        const parentId = this.props.parent.id;
        const data = { id, timestamp, parentId, ...serializeForm(e.target, {hash: true}) };
        this.props.createNewComment(data);
        this.props.refresh();
        e.target.reset();

    }

    render() {
        return (
            <div className='comment-form'>
                <h3 className='center'>Add a comment</h3>
                <Form onSubmit={this.handleSubmit} className='create-post-form'>
                    <Input name='body' floatingLabel={true}  label='Comment' />
                    <Input name='author' floatingLabel={true}  label='Author' />
                    <Button color='primary'>Add comment</Button>
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