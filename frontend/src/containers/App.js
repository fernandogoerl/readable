import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import * as api from '../api/api';


export default class App extends Component {
    state = {
        categories: [],
        posts: [],
    }

    componentDidMount () {
        api.getAllCategories().then((categories) => {
            this.setState({ categories });
        });
        api.getAllPosts().then((posts) => {
            this.setState({ posts });
        });
    };

    render() {
        return (
            <div>
                <Route exact path='/' render={() => (
                    <Home state={this.state} />
                )} />
                <Route path='/:category' render={() => (
                    <Category state={this.state} />
                )} />
            </div>
        );
    }
}
