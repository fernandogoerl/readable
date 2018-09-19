import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchAllPosts, fetchCategoryPosts } from '../actions';
import { order } from "../helpers";

import Header from '../components/Header';
import PostBlock from "../components/PostBlock";
import CreatePostButton from "../components/CreatePostButton";

import './Home.css'


class Home extends Component {

    state = {
        currentCategory : 'all',
        currentOrder : 'voteScore'
    }

    componentDidMount() {
        let currentCategory = this.props.match.params.category;
        if (currentCategory) {
            this.props.fetchCategoryPosts(currentCategory);
            this.setState({currentCategory});
        } else this.props.fetchAllPosts();

    }

    componentDidUpdate(prevProps) {
        let currentCategory = this.props.match.params.category;
        if (this.props.location.pathname !== prevProps.location.pathname && currentCategory) {
            this.props.fetchCategoryPosts(currentCategory);
            this.setState({currentCategory});
        }
        if (this.props.location.search && this.props.location.search !== prevProps.location.search ) {
            let currentOrder = this.props.location.search.substring(7);
            this.setState({ currentOrder });
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

    refresh = () => {
        let currentCategory = this.props.match.params.category;
        if (currentCategory) {
            this.props.fetchCategoryPosts(currentCategory);
            this.setState({currentCategory});
        } else this.props.fetchAllPosts();
    }

    render() {
        const { posts, location, match } = this.props;
        const { currentCategory, currentOrder } = this.state;
        let orderedPosts = location.search ? order(posts, location.search) : order(posts, 'voteScore');

        return (
            <div>
                <Header url={{location, match}} current={{category: currentCategory, order:currentOrder}}/>
                {posts && <div className='home-content'>
                    <h2 className='center'>{`${this.manageOrder(currentOrder)} on /${currentCategory}`}</h2>
                    <ul>{orderedPosts.length > 0
                        ? (orderedPosts.map((post) =>
                            (<li key={ post.id }>
                                    <PostBlock data={post} withLink={true} refresh={this.refresh}/>
                            </li>)))
                        : `nothing to see here`}
                    </ul>
                </div>}
                <CreatePostButton/>
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
export default connect(mapStateToProps, mapDispatchToProps)(Home);