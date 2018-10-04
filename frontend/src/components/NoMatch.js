import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class NoMatch extends Component {

    state = {
        triggerRedirect: false,
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({triggerRedirect: true})
        }, 2000);
    }

    render() {
        if(this.state.triggerRedirect === true){
            return <Redirect to='/'/>
        }

        return (
            <div>
                <h2 className='center m1'>404 Nothing to see here!</h2>
                <h3 className='center m1'>Redirecting to /all...</h3>
            </div>
        );
    }
}

export default NoMatch;