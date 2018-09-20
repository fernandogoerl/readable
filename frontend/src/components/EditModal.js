import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCategories, editPost, editComment } from '../actions';

import serializeForm from 'form-serialize';
import Form from 'muicss/lib/react/form';
import Input from 'muicss/lib/react/input';
import Button from 'muicss/lib/react/button';

import './CreatePost.css';

class EditModal extends Component {

    state = {
        newTitle: '',
        newBody: '',
    }

    componentDidMount() {
        if(this.props.data.title) {
            this.setState({ newTitle: this.props.data.title });
        };
        this.setState({ newBody: this.props.data.body });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const timestamp = Date.now();
        const data = { id: this.props.data.id, timestamp, ...serializeForm(e.target, {hash: true}), };
        if (this.props.data.title) {
            this.props.editPost(data)
        } else this.props.editComment(data);
        setTimeout(() => {this.props.closeModal()}, 50);

    }

    handleEditTitle = (newTitle) => this.setState({ newTitle });

    handleEditBody = (newBody) => this.setState({ newBody });

    render() {
        const { data } = this.props;
        const { newTitle, newBody } = this.state;
        const dataType = (data.title) ? 'post' : 'comment';
        const dataCategory = (data.category) ? `at /${data.category}` : '';
        return (
            <div>
                <h3 className='center'>{`Edit ${dataType} by ${data.author} ${dataCategory}`}</h3>
                <Form onSubmit={this.handleSubmit} >

                    {data.title && <div>
                        <Input name='title' autoFocus={true} floatingLabel={true}  label='Title' value={newTitle} onChange={(e) => this.handleEditTitle(e.target.value)}/>
                    </div>}
                    <Input name='body' floatingLabel={true}  label='Content' value={newBody} onChange={(e) => this.handleEditBody(e.target.value)}/>
                    <Button color='primary'>Save</Button>
                </Form>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        editPost: (data) => dispatch(editPost(data)),
        editComment: (data) => dispatch(editComment(data)),
    }
}

export default connect(null, mapDispatchToProps)(EditModal);