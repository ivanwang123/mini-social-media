import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getUserProjects, addFollower, removeFollower, getOneProject} from '../actions/projectActions';
import {getProjectPosts} from '../actions/postActions';
import Post from './Post';
import EditProject from './EditProject';
import PostModal from './PostModal';

class Project extends Component {
    state = {
        title: '',
        description: '',
        username: '',
        date: '',
        followers: 0,
        follows: false,
        curProject: null
    }

    static propTypes = {
        getUserProjects: PropTypes.func.isRequired,
        getProjectPosts: PropTypes.func.isRequired,
        getOneProject: PropTypes.func.isRequired,
        addFollower: PropTypes.func.isRequired,
        removeFollower: PropTypes.func.isRequired,
        project: PropTypes.object.isRequired,
        auth: PropTypes.object.isRequired,
        post: PropTypes.object.isRequired
    }

    componentDidMount() {
        this.props.getOneProject(this.props.match.params.username, this.props.match.params.project)
            .then(() => {
                this.setState({
                    curProject: this.props.project.projects,
                })
                this.setState({
                    title: this.state.curProject.title,
                    description: this.state.curProject.description,
                    username: this.props.match.params.username,
                    followers: this.state.curProject.followers,
                    date: new Date(this.state.curProject.date).toLocaleString('default', { month: 'short', day: 'numeric' })
                })

                this.props.getProjectPosts(this.state.curProject._id);

                if (this.state.followers.includes(this.props.auth.user._id)) {
                    this.setState({
                        follows: true
                    })
                }
            })
        document.body.style.overflow = "hidden";
        window.scrollTo(0, 0);        
    }
    
    handleScroll = (e) => {
        if (this.postFeed === null || this.postFeed === undefined) {
            this.postFeed = document.getElementById('post-feed')
        } else {
            if (e.deltaY < 0) {
                this.postFeed.scrollLeft -= 100;
            } else if (e.deltaY > 0) {
                this.postFeed.scrollLeft += 100;
            }
        }
    }

    follow = () => {
        this.props.addFollower(this.state.curProject._id, this.props.auth.user._id)
            .then(() => {
                this.setState({
                    follows: true
                })
            });
    }

    unfollow = () => {
        this.props.removeFollower(this.state.curProject._id, this.props.auth.user._id)
            .then(() => {
                this.setState({
                    follows: false
                })
            })
    }

    render() {
        const numPosts = this.state.curProject===null ? 0 : (this.props.post.posts.length);
        if (this.props.project.projects.title) {
        return (
            
            <div className="main-container project-container">
                
                <div className="project-header">
                    <div className="left">
                        <div className="title">{this.state.title}</div>
                        <div className="d-flex">
                            <div className="profile-pic"></div>
                            <p className="username ml-2" onClick={()=>window.location.href=`/user/${this.state.username}/profile`}><span>{this.state.username}</span></p>
                        </div>
                    </div>
                    <div className="right">
                        <p className="description">{this.state.description}</p>
                        <div className="follows-container mb-3">
                                <div className="followers"><strong>{this.props.project.projects.followers.length}</strong> <span>Followers</span></div>
                            </div>
                        {this.props.auth.user.username === this.state.username ? (
                            <div className="d-flex row">
                                 <EditProject projectID={this.state.curProject._id} description={this.state.description}/>
                                 <PostModal projectID={this.state.curProject._id} />
                            </div>
                        ) : (
                            <div className="d-flex row">
                                {this.state.follows ? <button type="button" className="white-btn ml-3" onClick={this.unfollow}>Following</button> : <button type="button" className="colored-btn ml-3" onClick={this.follow}>Follow</button>}
                            </div>
                        )}
                        
                        
                        {/* <button type="button" className="colored-btn">Post</button> */}
                    </div>
                </div>

                <div className="post-feed" id="post-feed" onWheel={(e)=>this.handleScroll(e)}>
                        {numPosts > 0 ? (
                    <div className="post-feed-info">
                            <div>
                                <span>Ongoing</span><br></br>
                                Started {this.state.date}<br></br>
                                {numPosts} total posts<br></br>
                            </div>
                    </div>
                        ) : (
                            <div className="post-feed-info post-feed-start">

                            <div>
                                <span>Start your journey</span>
                                Create a post
                            </div>
                            </div>
                        )}
                        
                    {this.props.post.posts.map(post => {
                            console.log("POST IMAGE", post.image)
                            return <Post username={this.state.username} content={post.content} image={post.image}/>
                        })
                    }
                    {numPosts > 0 ? <div className="filler">Filler</div> : null}
                    
                </div>                
            </div>
        )
                }
                else {
                    return null;
                }
    }
    
}

const mapStateToProps = (state) => ({
    project: state.project,
    auth: state.auth,
    post: state.post
})

export default connect(mapStateToProps, {getUserProjects, getProjectPosts, addFollower, getOneProject, removeFollower})(Project);