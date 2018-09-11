import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';

import { fetchCategories } from '../actions'

import { FaHome } from 'react-icons/fa';
import './Header.css'

class Header extends Component {

    componentDidMount() {
        this.props.fetchCategories();
    }

    render() {
        const { categories } = this.props;
        return (
            <div className='header'>
                <h1 className='title'>Readable</h1>
                {categories &&
                    <ul className='categories'>
                        <li className='bold'>{'Categories'}</li>
                        <li><Link to='/'>All</Link></li>
                        {categories.map((category) => (
                            <li key={category.name}><Link to={`/${category.name}`}>{category.name}</Link></li>
                        ))}
                        <li className='bold'>{'Order by'}</li>
                        <li><Link to={{search: '?order=voteScore'}}>{'votes'}</Link></li>
                        <li><Link to={{search: '?order=title'}}>{'title'}</Link></li>
                        <li><Link to={{search: '?order=timeStamp'}}>{'time'}</Link></li>
                    </ul>
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
	return {
		categories: state.categories
	}
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCategories: () => dispatch(fetchCategories()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Header)