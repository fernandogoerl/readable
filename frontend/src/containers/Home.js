import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { fetchAllPosts, fetchCategoryPosts, fetchCategories, } from '../actions';
import { orderPosts } from '../helpers';

import Header from '../components/Header';
import PostBlock from '../components/PostBlock';
import CreatePostButton from '../components/CreatePostButton';


class Home extends Component {

    state = {
        currentCategory : 'all',
        currentOrder : 'voteScore'
    }

    componentDidMount() {
        let currentCategory = this.props.match.params.category;
        this.props.fetchCategories();
        if (currentCategory) {
            this.props.fetchCategoryPosts(currentCategory);
            this.setState({ currentCategory });
        } else this.props.fetchAllPosts();

    }

    componentDidUpdate(prevProps) {
        let currentCategory = (this.props.match.params.category !== undefined ) ? this.props.match.params.category : 'all';

        if (this.props.location.pathname !== prevProps.location.pathname && currentCategory !== 'all') {
            this.props.fetchCategoryPosts(currentCategory);
            this.setState({ currentCategory });
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
            this.setState({ currentCategory });
        } else this.props.fetchAllPosts();
    }

    toCategoryAll = () => {
        this.props.fetchAllPosts();
        this.setState({currentCategory: 'all'});
    };

    render() {
        const { posts, location, match, openModal, categories } = this.props;
        const { currentCategory, currentOrder } = this.state;
        let orderedPosts = location.search ? orderPosts(posts, location.search) : orderPosts(posts, 'voteScore');
        if(categories.length > 0 && !categories.find((category) => category.path === currentCategory) && currentCategory!=='all'){
            return <Redirect to='/404'/>
        }
        
        return (
            <div>
                <Header url={{location, match}} current={{category: currentCategory, order:currentOrder}} refresh={this.toCategoryAll} categories={categories}/>
                {orderedPosts && <div className='home-content'>
                    <h2 className='center'>{`${this.manageOrder(currentOrder)} at /${currentCategory}`}</h2>
                    {orderedPosts.length > 0
                        ? <ul> {(orderedPosts.map((post) =>
                            (<li key={ post.id }>
                                    <PostBlock data={post} withLink={true} refresh={this.refresh} openModal={openModal}/>
                            </li>)))
                        }</ul>
                        : <h3 className='error-404'>{`404: No posts in this category`}</h3>
                    }
                </div>}
                <CreatePostButton/>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        posts: state.posts,
        categories: state.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllPosts: () => dispatch(fetchAllPosts()),
        fetchCategoryPosts: (category) => dispatch(fetchCategoryPosts(category)),
        fetchCategories: () => dispatch(fetchCategories()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);