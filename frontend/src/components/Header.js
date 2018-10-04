import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCategories } from '../actions'

class Header extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    manageOrderActive = (currentOrder, order) => (currentOrder === order ? 'active' : '');

    manageCategoryActive = (currentCategory, category) => {
        // console.log(currentCategory);
        return (currentCategory === category) ? 'active' : '';};

    render() {
        const { categories, url, current } = this.props;
        let currentCategory = '';
        let currentOrder = '';
        if(url && (url.match.path !== '/:category/:id')){
            currentCategory = current.category;
            currentOrder = current.order;

        }
        console.log(current)


        return (
            <div className='header'>
                <Link to='/'><h1 className='title'>Readable</h1></Link>
                {url && (url.match.path !== '/:category/:id') &&
                    <div className='header-bar'>
                        <span className='bold'>{'Categories:'}</span>
                        <ul className='categories'>
                            <li className={this.manageCategoryActive(currentCategory, 'all')}><Link to='/' onClick={() => {currentCategory = 'all'; this.props.refresh()}}>All</Link></li>
                            {categories &&
                            categories.map((category) => (
                                <li key={category.name} className={this.manageCategoryActive(currentCategory, category.path)}><Link to={`/${category.path}`}>{category.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                }
                {url && (url.match.path !== '/:category/:id') &&
                    <div className='header-bar'>
                        <span className='bold'>{'Order by:'}</span>
                        <ul className='order'>
                            <li className={this.manageOrderActive(currentOrder, 'voteScore')}><Link to={{ search: '?order=voteScore' }}>{'votes'}</Link></li>
                            <li className={this.manageOrderActive(currentOrder, 'title')}><Link to={{ search: '?order=title' }}>{'title'}</Link></li>
                            <li className={this.manageOrderActive(currentOrder, 'timestamp')}><Link to={{ search: '?order=timestamp' }}>{'time'}</Link></li>
                        </ul>
                    </div>
                }
            </div>
        );
    };
};

const mapStateToProps = (state, ownProps) => {
	return {
        categories: state.categories
	};
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header)