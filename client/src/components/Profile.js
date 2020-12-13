import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {authenticated} from '../actions/authActions';
import {createProject, getProjects, getUserProjects} from '../actions/projectActions';
import {connect} from 'react-redux';
import {getUser} from '../actions/authActions';
import {Route, Redirect} from 'react-router-dom';
import Post from './Post';
import Project from './Project';
import EditProfile from './EditProfile';
import ProjectModal from './ProjectModal';

class Profile extends Component {
    state = {
        username: '',
        projectIDs: [],
        projects: [],
        bio: '',
        profilePic: '',
        date: ''
    }
    static propTypes = {
        getUser: PropTypes.func.isRequired,
        createProject: PropTypes.func.isRequired,
        getProjects: PropTypes.func.isRequired,
        getUserProjects: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
    }

    clickProject = (title) => {
        this.props.history.push(`/user/${this.state.username}/projects/${title}`);
        console.log(this.props);
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.username)
            .then(result => {
                this.setState({
                    username: result.user.username,
                    projectIDs: result.user.projects,
                    bio: result.user.bio,
                    profilePic: result.user.profilePic,
                    date: new Date(result.user.date).toLocaleString('default', { month: 'short', day: 'numeric' })
                })
                console.log("RESULLT", result)
            })
        this.props.getUserProjects(this.props.match.params.username)
        document.body.style.overflow = "auto";
        window.scrollTo(0, 0);
        console.log("BIO", this.state.bio);
    }

    render() {
        var reverseProjects = null;
        if (this.props.project.projects.length) {
            reverseProjects = this.props.project.projects.reverse();
        }
        console.log("STATE", this.state)
        return (
            <div className="main-container">
                <div className="profile-header">
                    <div className="profile-pic" style={{backgroundImage: `url(${'/uploads/'+this.state.profilePic})`}}></div>
                    <div className="info ml-5">
                        <h2 className="username">{this.state.username}</h2>
                        <p className="bio">{this.state.bio}</p>
                        <p className="date">Joined {this.state.date}</p>
                        <div className="follows-container">
                            {this.props.auth.user.username === this.state.username ? <EditProfile bio={this.state.bio}/> : null}
                        </div>
                    </div>
                </div>
                
                <div className="feed">
                <div className="content-bar">
                    <div style={{textDecoration:"underline"}}>Projects</div>
                    <div>Contacts</div>
                    <ProjectModal username={this.state.username}/>

                </div>
                    {reverseProjects ? reverseProjects.map(({_id, title, description, image}) => (
                        <div className="project" onClick={()=>this.clickProject(title)}>
                        <div className="project-pic" style={{backgroundImage:`url(/uploads/${image})`}}></div>
                        <div className="info">
                            <div className="title mt-3">{title}</div>
                            <p className="description">{description}</p>
                        </div>
                        </div>
                    )) : null}
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: state.project,
    auth: state.auth,
});

export default connect(mapStateToProps, {getUser, createProject, getProjects, getUserProjects})(Profile);
