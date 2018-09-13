import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchAllPosts, fetchCategoryPosts} from '../actions';

import { order, timeConverter} from "../helpers";

import './Home.css'

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
            case 'voteScore':
                return 'Popular Posts';
            case 'title':
                return 'All Posts A-Z';
            case 'timestamp':
                return 'Recent Posts';
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
                <div>
                    {posts && <div className='home-content'>
                        <h2 className='center'>{`${this.manageOrder(currentOrder)} on /${currentCategory}`}</h2>
                        <ul>{orderedPosts.length > 0
                            ? (orderedPosts.map((post) =>
                                <li key={post.id}>
                                    <div className='basic-container'>
                                        <Link to={`/posts/${post.id}`}><h3>{post.title}</h3></Link>
                                        <h4>{post.body}</h4>
                                        <h5>{`(${post.voteScore} votes)`}</h5>
                                        <span className='meta-info'>
                                            {`Posted on ${timeConverter(post.timestamp).toDateString()} at ${timeConverter(post.timestamp).getHours()}:${timeConverter(post.timestamp).getMinutes()} by ${post.author}`}
                                        </span>
                                    </div>
                                </li>))
                            : `nothing to see here`}
                        </ul>
                    </div>}
                </div>
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