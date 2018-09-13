import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchCategories } from '../actions'

import './Header.css'

class Header extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    };

    render() {
        const { categories } = this.props;
        return (
            <div className='header'>
                <h1 className='title'>Readable</h1>
                <div className='header-bar'>
                    <span className='bold'>{'Categories'}</span>
                    <ul className='categories'>
                        <li><Link to='/'>All</Link></li>
                        {categories &&
                        categories.map((category) => (
                            <li key={category.name}><Link to={`/${category.name}`}>{category.name}</Link></li>
                        ))}
                    </ul>
                </div>
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