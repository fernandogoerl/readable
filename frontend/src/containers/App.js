import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PostDetail from '../components/PostDetail';

import './App.css'


export default class App extends Component {


    render() {
        return (
            <div>
                <Header/>
                <div className='content-container'>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/:category' component={Home} />
                    <Route exact path='/posts/:id' component={PostDetail} />
                </div>
                <Footer/>
            </div>
        );
    }
}
