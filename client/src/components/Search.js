import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjects, getTermProjects} from '../actions/projectActions';
import PropTypes from 'prop-types';

class Search extends Component {
    state = {
        isLoading: true
    }

    static propTypes = {
        getProjects: PropTypes.func.isRequired,
        getTermProjects: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired
    }

    componentDidMount() {
        document.body.style.overflow = "auto";
        this.setState({
            isLoading: true
        })

        this.props.getTermProjects(this.props.match.params.term)
            .then(() => {
                this.setState({
                    isLoading: false
                })
            });
    }

    clickProject = (title, username) => {
        this.props.history.push(`/user/${username}/projects/${title}`);
    }
    clickUsername = (e, address) => {
        e.stopPropagation();
        this.props.history.push(address);
    }

    render() {
        if (this.state.isLoading) {
            return null;
        } else {
        const projects = this.props.project.projects;
        return (
            
            <div className="main-container">
            <h6 style={{color: "var(--secondary-font-color)"}} className="mt-3">Search for "{this.props.match.params.term}"</h6>

            <div className="browse-container">
                    {projects.length > 0 ? <div className="browse-feed">
                    {projects.map(({_id, title, description, username, image}) => (
                        <div className="project" onClick={()=>this.clickProject(title, username)}>
                            <div className="project-pic" style={{backgroundImage:`url(/uploads/${image})`}}></div>
                            <div className="info">
                                <div className="title mt-3">{title}</div>
                                <p className="description">{description}</p>
                                <p className="username" onClick={(e)=>this.clickUsername(e, `/user/${username}/profile`)}>By {username}</p>
                            </div>
                        </div>
                    ))}</div> : <div className="browse-feed"><h1 style={{color: "var(--secondary-font-color)"}} className="mt-3 ml-5">No Projects</h1></div>
                }
                </div>
            
            </div>
        )
        }
    }
}

const mapStateToProps = (state) => ({
    project: state.project
})

export default connect(mapStateToProps, {getProjects, getTermProjects})(Search);