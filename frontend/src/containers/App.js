import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import CreatePost from '../components/CreatePost';
import PostDetail from '../components/PostDetail';

import './App.css'


export default class App extends Component {


    render() {
        return (
            <div>
                <div className='content-container'>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/post/add' component={CreatePost} />
                    <Route exact path='/:category' component={Home} />
                    <Route exact path='/posts/:id' component={PostDetail} />
                </div>
            </div>
        );
    }
}
