import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Home from './Home';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import EditModal from '../components/EditModal';
import PostDetail from './PostDetail';
import { FaTimes } from 'react-icons/fa';



export default class App extends Component {


    state = {
        editModalOpen: false,
        modalData: {}
    }

    openModal = (modalData) => {
        this.setState({ editModalOpen: true, modalData })
    };

    closeModal = () => this.setState({ editModalOpen: false });

    render() {
        const { editModalOpen, modalData } = this.state;
        return (
            <div id='app'>
                <div className='content-container'>
                    <Route exact path='/' render={(props) => <Home {...props} openModal={this.openModal}/>} />
                    <Route exact path='/:category' render={(props) => <Home {...props} openModal={this.openModal}/>} />
                    <Route exact path='/post/add' render={(props) => <CreatePost {...props} openModal={this.openModal}/>} />
                    <Route exact path='/posts/:id' render={(props) => <PostDetail {...props} openModal={this.openModal}/>} />
                    <Footer/>
                </div>
                <Modal
                    className='modal'
                    overlayClassName='overlay'
                    isOpen={editModalOpen}
                    onRequestClose={this.closeModal}
                    contentLabel='Modal'
                >
                    <button className='close-button' onClick={() => this.closeModal()} aria-label='Close modal' type='button'><FaTimes/></button>
                    <EditModal data={modalData} closeModal={this.closeModal} />
                </Modal>
            </div>
        );
    }
}
