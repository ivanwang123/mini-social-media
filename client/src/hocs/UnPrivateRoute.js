import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {authenticated} from '../actions/authActions';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Profile from '../components/Profile';

class UnPrivateRoute extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false
    }

    componentDidMount() {
        const {isAuthenticated, authenticated, ...rest} = this.props;
        this.setState({
            isLoading: true
        })
        authenticated().then(result => {
            this.setState({
                isLoading: false,
                isAuthenticated: result
            })
        })
    }

    render() {
        const {component: ReactComponent, isAuthenticated, authenticated, ...rest} = this.props;
        return (
            <Route {...rest} render={routeProps => {
                if (this.state.isLoading) {
                    return null;
                } else if (this.state.isAuthenticated) {
                    return <Redirect to={{pathname:'/home', state: {from:routeProps.location}}}/>
                } else {
                    return <ReactComponent {...routeProps}/>
                }
            }}/>
        )
    }


    // return <div />;
    // return <Route {...rest} render={routeProps => {
    //         // if (!isAuthenticated)
    //         //     return <Redirect to='/login'/>
    //         // else
    //         //     return <Component {...routeProps}/>
    //         authenticated().then(result => {
    //             return <Component {...routeProps}/>
    //         })
    //     }}/>  
        
        // return null;
        // return <Route {...rest} render={null}/>  
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {authenticated})(UnPrivateRoute);
