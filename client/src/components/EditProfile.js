import React, {Component} from 'react';
import {createPost} from '../actions/postActions';
import {editProfile} from '../actions/authActions';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';


class EditProfile extends Component {
    state = {
        modal: false,
        bio: this.props.bio,
        profilePic: null,
        errors: ''
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        editProfile: PropTypes.func.isRequired,
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }
    handleFile = (e) => {
        console.log("HANDLE FILE", e.target.files[0])
        this.setState({
            profilePic: e.target.files[0]
        })
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();

        

        var formData = new FormData();
        if (this.state.profilePic !== null)
            formData.append('profilePic',this.state.profilePic, this.state.profilePic.name);
        formData.append('bio',this.state.bio);

        const data = {
            user: this.props.auth.user.username,
            formData: formData
        }

        // if (newProfile.bio.length === 0) {
        //     this.setState({
        //         errors: 'Content is required'
        //     })
        // } else {
            console.log("SUBMIT", data)
            this.props.editProfile(data)
                .then(() => {
                    this.setState({
                        errors: ''
                    })
                    this.toggle();
                    window.location.reload();
                });
        // }

    }
    render() {
        return (
            <div className="ml-3">
            <button className="white-btn" onClick={this.toggle}>Edit</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>Edit Profile</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit} autocomplete="off" enctype="multipart/form-data">
                        <Label for="bio">Bio</Label>
                        <Input type="textarea" name="bio" id="bio" placeholder="Bio" onChange={this.onChange} rows="3" style={{resize: "none"}} value={this.state.bio}/>
                        <Label className="mt-3" for="profilePic">Profile Pic</Label>
                        <Input type="file" name="profilePic" accept=".png .jpeg" onChange={this.handleFile}/>
                        <p className="mt-3 ml-3">{this.state.errors}</p>
                        <button className="colored-btn p-2 pl-3 pr-3" color="primary">Save</button>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {editProfile})(EditProfile);
