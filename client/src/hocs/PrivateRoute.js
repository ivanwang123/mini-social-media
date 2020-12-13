import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {authenticated} from '../actions/authActions';
import {connect} from 'react-redux';
import {compose} from 'redux';
import Profile from '../components/Profile';

class PrivateRoute extends Component {
    state = {
        isLoading: true,
        isAuthenticated: false
    }

    componentDidMount() {
        const {isAuthenticated, authenticated} = this.props;
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
                    return <ReactComponent {...routeProps}/>
                } else {
                    return <Redirect to={{pathname:'/login', state: {from:routeProps.location}}}/>
                }
            }}/>
        )
        
        
    } 
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {authenticated})(PrivateRoute);
