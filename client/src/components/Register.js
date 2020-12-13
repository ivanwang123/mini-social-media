import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {register} from '../actions/authActions';

class Register extends Component {
    state = {
        username: '',
        password: '',
        confirmPassword: '',
        errors: '',
        message: {message: {msgBody: null, msgError: false}}
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        register: PropTypes.func.isRequired
    }

    componentDidUpdate(prevProps) {
        const {error, isAuthenticated} = this.props;
        if (error !== prevProps.error) {
            if (error.id === 'REGISTER_FAIL')
                this.setState({message: {msgBody: error.msg.msg, msgError: true}});
            else
                this.setState({message: {msgBody: null, msgError: false}});
        }

        console.log("AUTHENTICATED", isAuthenticated);
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit = (e) => {
        e.preventDefault();
        
        const {username, password} = this.state;
        const newUser = {
            username,
            password
        };

        if (newUser.username.length < 2) {
            this.setState({
                errors: 'Username has to be at least 2 characters'
            })
        } else if (newUser.password.length < 6) {
            this.setState({
                errors: 'Password has to be at least 6 characters'
            })
        } else if (this.state.confirmPassword !== newUser.password) {
            this.setState({
                errors: 'Passwords do not match'
            })
        } else {
            this.props.register(newUser).then(result => {
                if (result) {
                    this.setState({
                        errors: ''
                    });
                    this.props.history.push('/login');
                } else {
                    this.setState({
                        errors: 'Username is already taken'
                    })

                }
                
            });
            
        }
    }

    render() {
        console.log("register", this.state.message)
        return (
            <div className="main-container">
                <h1 className="m-5">Register</h1>
                <form onSubmit={this.onSubmit} className="form-container" autoComplete="off">
                    <input className="input-container" type="text" name="username" id="username" placeholder="Username" onChange={this.onChange} />
                    <input className="input-container mt-3" type="password" name="password" id="password" placeholder="Password" onChange={this.onChange} />
                    <input className="input-container mt-3" type="password" name="confirmPassword" id="confirm-password" placeholder="Confirm Password" onChange={this.onChange} />
                    <p className="m-2">{this.state.errors}</p>
                    <button className="input-container colored-btn mt-2" type="submit">Register</button>
                </form>
                <p className="small-text mt-2">Already have an account? <a href="/login">Login</a></p>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {register})(Register);