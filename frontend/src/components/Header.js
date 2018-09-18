import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchCategories } from '../actions'

import './Header.css'

class Header extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    manageOrderActive = (currentOrder, order) => (currentOrder === order ? 'active' : '');

    manageCategoryActive = (currentCategory, category) => ( (currentCategory === category) ? 'active' : '');

    render() {
        const { categories, url, current } = this.props;

        return (
            <div className='header'>
                <h1 className='title'>Readable</h1>
                {url &&(url.location.pathname === '/' || url.match.params.category) && <div>
                    <div className='header-bar'>
                        <span className='bold'>{'Categories'}</span>
                        <ul className='categories'>
                            <li className={this.manageCategoryActive(current.category, 'all')}><Link to='/'>All</Link></li>
                            {categories &&
                            categories.map((category) => (
                                <li key={category.name} className={this.manageCategoryActive(current.category, category.path)}><Link to={`/${category.path}`}>{category.name}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className='header-bar'>
                        <span className='bold'>{'Order by'}</span>
                        <ul className='order'>
                            <li className={this.manageOrderActive(current.order, 'voteScore')}><Link to={{ search: '?order=voteScore' }}>{'votes'}</Link></li>
                            <li className={this.manageOrderActive(current.order, 'title')}><Link to={{ search: '?order=title' }}>{'title'}</Link></li>
                            <li className={this.manageOrderActive(current.order, 'timestamp')}><Link to={{ search: '?order=timestamp' }}>{'time'}</Link></li>
                        </ul>
                    </div>
                </div>}
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