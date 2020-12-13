import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {login} from '../actions/authActions';
var ReactRouter = require('react-router');
var Route = ReactRouter.Route;
var Router = ReactRouter.Router;

class Login extends Component {
    state = {
        username: '',
        password: '',
        message: {message: {msgBody: null, msgError: false}},
        isAuthenticated: false
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        login: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL')
                this.setState({message: {msgBody: error.msg.msg, msgError: true}});
            else
                this.setState({message: {msgBody: null, msgError: false}});
        }
        if (isAuthenticated) {
            this.setState({
                isAuthenticated
            })
            this.props.history.push('/user/'+this.state.username+'/profile');
            window.location.reload();
        }
            
        console.log("AUTHENTICATED", isAuthenticated);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const {username, password} = this.state;
        const user = {
            username,
            password
        };

        this.props.login(user);
    }

    render() {
        return (
            <div className="main-container">
                <h1 className="m-5">Login</h1>
                <form onSubmit={this.onSubmit} className="form-container">
                    <input className="input-container" type="text" name="username" id="username" placeholder="Username" autoComplete="off" onChange={this.onChange} />
                    <input className="input-container mt-3" type="password" name="password" id="password" placeholder="Password" autoComplete="off" onChange={this.onChange} />
                    <button className="input-container colored-btn mt-4" type="submit">Login</button>
                </form>
                <p className="small-text mt-2">Don't have an account? <a href="/register">Register</a></p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);