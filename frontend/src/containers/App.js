import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './Home';
import CreatePost from '../components/CreatePost';
import Footer from '../components/Footer';
import EditModal from '../components/EditModal';
import NoMatch from '../components/NoMatch';
import PostDetail from './PostDetail';

import Modal from 'react-modal';
import { FaTimes } from 'react-icons/fa';

Modal.setAppElement('#root');


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
            <div>
                <div className='content-container'>
                    <Switch>
                        <Route exact path='/404' component={NoMatch}/>
                        <Route exact path='/' render={(props) => <Home {...props} openModal={this.openModal}/>} />
                        <Route exact path='/createNewPost' render={(props) => <CreatePost {...props} openModal={this.openModal}/>} />
                        <Route exact path='/:category' render={(props) => <Home {...props} openModal={this.openModal}/>} />
                        <Route path='/:category/:id' render={(props) => <PostDetail {...props} openModal={this.openModal}/>} />
                    </Switch>
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
