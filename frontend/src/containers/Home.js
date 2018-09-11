import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllPosts, fetchCategoryPosts } from '../actions';

import * as helpers from "../helpers";

import './Home.css'

class Home extends Component {

    componentDidMount() {
        if(this.props.match.params.category) {
            this.props.fetchCategoryPosts(this.props.match.params.category);
            console.log(`teste ${this.props.location.pathname !== '/'}`);
        } else this.props.fetchAllPosts();
    }

    componentDidUpdate(prevProps) {
        if( this.props.location.pathname !== prevProps.location.pathname ) {
            this.props.fetchCategoryPosts(this.props.match.params.category);
        }
    }

    render() {
        const { posts, location } = this.props;

        let orderedPosts = location.search ? helpers.order(posts, location.search) : posts;

        return (
            <div className='home-container'>
                {posts &&
                <div className='popular-posts'>
                    <h2>Popular Posts</h2>
                    <ul>
                        {orderedPosts &&
                        orderedPosts.map((post) => (
                            <li key={post.id}>
                                <Link to='/post/:id'>{`${post.title}`}</Link> ({post.voteScore} votes)
                            </li>
                        ))}
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
        fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)