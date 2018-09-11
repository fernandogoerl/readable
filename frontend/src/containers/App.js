import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Home from './Home';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Post from '../components/Post';


export default class App extends Component {


    render() {
        return (
            <div>
                <Header/>
                <Route exact path='/' component={Home} />
                <Route exact path='/:category' component={Home} />
                <Route exact path='/post/:id' component={Post} />
                <Footer/>
            </div>
        );
    }
}
