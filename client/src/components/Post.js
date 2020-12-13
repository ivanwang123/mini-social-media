import React, {Component} from 'react';

const Post = ({username, content, image}) => {
    return (
        <div className="post-container">
            <div className="post-img">
                {image === '' ? null : <img src={'/uploads/'+image}/>}
            </div>
            <div className="post-content-container">
                <div className="post-header">
                    <div className="profile-pic post-profile-pic"></div>
                    <span className="username ml-3">{username}</span>
                </div>
                <div className="content ml-3">
                    <br/>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default Post;