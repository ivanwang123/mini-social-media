import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router';
import {logout} from '../actions/authActions';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container,
    Input,
    Form,
    Button
} from 'reactstrap';

class AppNavbar extends Component {
    state = {
        isOpen: false,
        search: ''
    }

    static propTypes= {
        auth: PropTypes.object.isRequired,
        logout: PropTypes.func.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    handleSearch = (e) => {
        e.preventDefault();
        if (this.state.search.length > 0) {
            this.props.history.push('/search/'+this.state.search);
            window.location.reload();
            this.setState({
                search: ''
            })
        }
    }

    handleChange = (e) => {
        this.setState({
            search: e.target.value
        })
    }


    logout = () => {
        this.props.logout()
            .then(() => {
                this.props.history.push('/login');
                window.location.reload();
            })
    }

    render() {

        const authNavbar = (
            <Fragment>
                <Form onSubmit={this.handleSearch} className="mr-3">
                    <Input type="text" name="search" placeholder="Search" onChange={this.handleChange} value={this.state.search}/>
                </Form>
                <NavItem>
                    <span className="navbar-text mr-3">
                        {this.props.auth.user ? <a href={`/user/${this.props.auth.user.username}/profile`}>Profile</a> : null}
                    </span>
                </NavItem>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <button onClick={this.logout} style={{background:"none", border:"none"}}>Logout</button>
                        
                    </span>
                </NavItem>
            </Fragment>
        );

        const unauthNavbar = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <a href="/login">Login</a>
                    </span>
                </NavItem>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <a href="/register">Register</a>
                    </span>
                </NavItem>
            </Fragment>
        )

        return (
            <div>
            <Navbar color="white" light expand="sm" className="app-navbar">
                <Container>
                    <NavbarBrand href={this.props.auth.isAuthenticated ? "/home" : "/"}>Journy</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.props.auth.isAuthenticated ? authNavbar : unauthNavbar}
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>

            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps, {logout})(AppNavbar));