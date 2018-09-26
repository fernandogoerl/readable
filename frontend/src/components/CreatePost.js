import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories, createNewPost } from '../actions';
import Header from '../components/Header';

import uuid from 'uuid';
import serializeForm from 'form-serialize';
import { Form, Input, Select, Option, Button } from 'muicss/react';
import { FaArrowLeft } from 'react-icons/fa';

class CreatePost extends Component {

    state = {
        triggerRedirect: false,
    }

    componentDidMount() {
        this.props.fetchCategories();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = uuid();
        const timestamp = Date.now();
        const data = { id, timestamp, ...serializeForm(e.target, {hash: true}), };
        console.log(data);
        this.props.createNewPost(data);
        this.setState({triggerRedirect: true});

    }

    render() {
        const { categories } = this.props;
        const { triggerRedirect } = this.state;
        return (
            <div>
                <Header/>
                <Link className='close-create-post' to='/'><FaArrowLeft/></Link>
                <h2 className='center'>Create new Post</h2>
                <Form onSubmit={this.handleSubmit} className='create-post-form'>
                    <Input name='title' autoFocus={true} floatingLabel={true} label='Title'/>
                    <Input name='body' floatingLabel={true}  label='Content' />
                    <Input name='author' floatingLabel={true}  label='Author' />
                    <Select defaultValue='none' name='category'>
                        <Option key={uuid()} value='none' disabled label='Select a category' />
                        {categories && categories.map((category) => (
                            <Option key={uuid()} value={category.path} label={category.name} />
                        ))}
                    </Select>
                    <Button color='primary'>Add post</Button>
                </Form>
                {triggerRedirect &&
                <Redirect to='/'/>}
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        categories: state.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
        createNewPost: (data) => dispatch(createNewPost(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);