import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllPosts, fetchCategoryPosts } from '../actions';

import { order } from "../helpers";

import './Home.css'

import BasicBlock from "../components/BasicBlock";

class Home extends Component {

    state = {
        currentCategory : 'all',
        currentOrder : 'voteScore'
    }

    componentDidMount() {
        if (this.props.match.params.category) {
            this.props.fetchCategoryPosts(this.props.match.params.category);
            this.setState({ currentCategory: this.props.match.params.category});
        } else this.props.fetchAllPosts();

    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.props.fetchCategoryPosts(this.props.match.params.category);
        }
        if (this.props.location.search && this.props.location.search !== prevProps.location.search ) {
            let currentOrder = this.props.location.search.substring(7);
            this.setState({ currentOrder });
        }
        if (this.props.match.params.category && this.props.match.params.category !== prevProps.match.params.category ) {
            this.setState({ currentCategory: this.props.match.params.category});
        }
    }

    manageOrder = (currentOrder) => {
        switch (currentOrder) {
            case 'voteScore' :
                return 'Popular Posts';
            case 'title' :
                return 'All Posts A-Z';
            case 'timestamp' :
                return 'Recent Posts';
            default :
                return 'Popular Posts';
        }
    };

    render() {
        const { posts, location } = this.props;
        const { currentCategory, currentOrder } = this.state;
        let orderedPosts = location.search ? order(posts, location.search) : order(posts, 'voteScore');

        return (
            <div>
                <div className='header header-bar'>
                    <span className='bold'>{'Order by'}</span>
                    <ul className='order'>
                        <li><Link to={{ search: '?order=voteScore' }}>{'votes'}</Link></li>
                        <li><Link to={{ search: '?order=title' }}>{'title'}</Link></li>
                        <li><Link to={{ search: '?order=timestamp' }}>{'time'}</Link></li>
                    </ul>
                </div>
                {posts && <div className='home-content'>
                    <h2 className='center'>{`${this.manageOrder(currentOrder)} on /${currentCategory}`}</h2>
                    <ul>{orderedPosts.length > 0
                        ? (orderedPosts.map((post) =>
                            (<li key={ post.id }>
                                    <BasicBlock data={post} withLink={true}/>
                            </li>)))
                        : `nothing to see here`}
                    </ul>
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)