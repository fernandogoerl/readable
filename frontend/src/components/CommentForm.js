import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";


import { createNewComment } from "../actions";

import uuid from 'uuid';
import serializeForm from 'form-serialize';
import { Form, Input, Textarea, Button } from "muicss/react";

import './CommentForm.css'


class CommentForm extends Component {

    state = {
        triggerRedirect: false,
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const id = uuid();
        const timestamp = Date.now();
        const data = { id, timestamp, ...serializeForm(e.target, {hash: true}), parentId: this.props.parent.id };
        console.log(data);
        this.props.createNewComment(data);
        this.setState({triggerRedirect: true});
        this.props.refresh();
        e.target.reset();

    }

    render() {
        const { parent, refresh } = this.props;
        const { triggerRedirect } = this.state;
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