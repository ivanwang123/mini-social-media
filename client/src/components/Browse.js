import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjects, getCategoryProjects} from '../actions/projectActions';
import PropTypes from 'prop-types';

class Browse extends Component {

    static propTypes = {
        getProjects: PropTypes.func.isRequired,
        getCategoryProjects: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getProjects();
        document.body.style.overflow = "auto";
    }

    clickProject = (title, username) => {
        this.props.history.push(`/user/${username}/projects/${title}`);
    }
    clickUsername = (e, address) => {
        e.stopPropagation();
        this.props.history.push(address);
    }

    clickNav = (category, e) => {
        Array.from(document.querySelectorAll('.option'), option => option.style.textDecoration = "none");
        e.target.style.textDecoration = "underline";
        if (category === 'All')
            this.props.getProjects();
        else
            this.props.getCategoryProjects(category);
        
        window.scrollTo(0, 0);
    }

    render() {
        const categories = require('../categories').categories;
        const projects = this.props.project.projects;
        return (
            <div className="main-container">

            <div className="explore-navbar">
                <div><a href="/home">Discover</a></div>
                <div><a href="/home/browse" style={{textDecoration: "underline"}}>Browse</a></div>
            </div>
            <div className="browse-container">
                <div className="browse-navbar">
                    <ul>
                        <li className="option" onClick={(e)=>this.clickNav("All", e)}>All</li>
                        {categories.map(category => (
                            <li className="option" onClick={(e)=>this.clickNav(category, e)}>{category}</li>
                        ))}
                    </ul>
                    
                </div>
                <div className="browse-feed">
                    {projects.map(({_id, title, description, username, image}) => (
                            <div className="project" onClick={()=>this.clickProject(title, username)}>
                            <div className="project-pic" style={{backgroundImage:`url(/uploads/${image})`}}></div>
                            <div className="info">
                                <div className="title mt-3">{title}</div>
                                <p className="description">{description}</p>
                                <p className="username" onClick={(e)=>this.clickUsername(e, `/user/${username}/profile`)}>By {username}</p>
                            </div>
                            </div>
                    ))}
                </div>
            </div>
            
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: state.project
})

export default connect(mapStateToProps, {getProjects, getCategoryProjects})(Browse);