import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getProjects} from '../actions/projectActions';
import PropTypes from 'prop-types';

class Home extends Component {
    state = {
        isLoading: true
    }
    static propTypes = {
        getProjects: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getProjects()
            .then(() => {
                this.setState({
                    isLoading: false
                })
            });
    }

    clickProject = (e, title, username) => {
        e.stopPropagation();
        this.props.history.push(`/user/${username}/projects/${title}`);
    }
    clickUsername = (e, address) => {
        e.stopPropagation();
        this.props.history.push(address);
    }

    largeProject = (project, img, label) => {
        return (
            <div className="featured-project">
            <div className="label"><strong>{label}</strong></div>
            <div className="project project-wide" onClick={(e)=>this.clickProject(e, project.title, project.username)}>
            <div className="project-pic-wide" style={{backgroundImage:`url(/uploads/${project.image})`}}></div>
            <div className="info-wide">
                <div className="title mt-3">{project.title}</div>
                <p className="description">{project.description}</p>
                <p className="username" onClick={(e)=>this.clickUsername(e, `/user/${project.username}/profile`)}>By {project.username}</p>
            </div>
            </div>
            </div>
        )
    }

    smallProject = (project, img) => {
        return (
            <div className="project" onClick={(e)=>this.clickProject(e, project.title, project.username)}>
            <div className="project-pic" style={{backgroundImage:`url(/uploads/${project.image})`}}></div>
            <div className="info">
                <div className="title mt-3">{project.title}</div>
                <p className="description">{project.description}</p>
                <p className="username" onClick={(e)=>this.clickUsername(e, `/user/${project.username}/profile`)}>By {project.username}</p>
            </div>
            </div>
        )
    }

    shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    render() {
        if (this.state.isLoading) {
            return null;
        } else {
        // featured, most popular, msot recent
        const projects = this.props.project.projects;

        const randomProjects = this.shuffle(projects);
        // console.log("RANDOM", randomProjects);

        // console.log("PROJECTS", projects);
        const mostPopular = projects.slice().sort((a, b) => {
            const followersA = a.followers.length;
            const followersB = b.followers.length;
            if (followersA > followersB)
                return -1;
            else if (followersA < followersB)
                return 1;
            return 0;
        });
        // console.log("MOST POPULAR", mostPopular);
        
        const mostRecent = projects.slice().sort((a, b) => new Date(b.date)-new Date(a.date));
        // console.log("MOST RECENT", mostRecent);

        return (
            <div className="main-container">

            <div className="explore-navbar">
                <div><a href="/home" style={{textDecoration: "underline"}}>Discover</a></div>
                <div><a href="/home/browse">Browse</a></div>
            </div>
            <div className="feed home-feed">
                
                {this.largeProject(randomProjects[0], 'pic-1', 'Featured Project')}
                
                <div className="featured-project">
                    <div className="label">Discover New Projects</div>
                </div>
                <div className="project-home-feed">
                {randomProjects.slice(1, 7).map((project, index) => {
                    const imgNum = Math.floor(Math.random()*4)
                    const img = 'pic-'+imgNum;
                    
                    return this.smallProject(project, img);
                })}
                </div>

                {this.largeProject(mostPopular[0], 'pic-2', 'Most Popular')}
                <div className="project-home-feed">
                {mostPopular.slice(1, 7).map((project, index) => {
                    const imgNum = Math.floor(Math.random()*4)
                    const img = 'pic-'+imgNum;
                    
                    return this.smallProject(project, img);
                })}
                </div>

                {this.largeProject(mostRecent[0], 'pic-3', 'Most Recent')}
                <div className="project-home-feed">
                {mostRecent.slice(1, 7).map((project, index) => {
                    const imgNum = Math.floor(Math.random()*4)
                    const img = 'pic-'+imgNum;
                    
                    return this.smallProject(project, img);
                })}
                </div>
            </div>
            </div>
        )
        }
    }
}

const mapStateToProps = (state) => ({
    project: state.project
})

export default connect(mapStateToProps, {getProjects})(Home);