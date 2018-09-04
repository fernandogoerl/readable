import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Home extends Component {
    static propTypes = {
        categories: PropTypes.array.isRequired
    }

    render() {
        const { categories, posts } = this.props.state;
        return (
            <div>
                <header>
                    <h1>Readable</h1>
                </header>
                {categories.length > 0 &&
                <div>
                    <h2>Categories</h2>
                    <ul>
                        {categories.map((category) => (
                            <li>
                            <Link to='/category'>
                                {category.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>}
                {posts &&
                <div>
                    <h2>Popular Posts</h2>
                    <ul>
                        {posts.map((post) => (
                            <li>
                            <Link to='/post/:id'>
                                {post.name}
                            </Link>
                        </li>
                        ))}
                    </ul>
                </div>}
                <div>
                    <h2>Popular</h2>
                    <select>
                        <option>Most Popular</option>
                        <option>Least Popular</option>
                        <option>Post Date</option>
                    </select>
                    <ul>
                        <li>Popular Post 1</li>
                        <li>Popular Post 2</li>
                        <li>...</li>
                    </ul>
                </div>
            </div>
        );
    }
}
