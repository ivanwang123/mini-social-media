import React, {Component} from 'react';
import {createPost} from '../actions/postActions';
import {editProject} from '../actions/projectActions';
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


class EditProject extends Component {
    state = {
        modal: false,
        description: this.props.description,
        errors: ''
    }
    static propTypes = {
        auth: PropTypes.object.isRequired,
        editProject: PropTypes.func.isRequired,
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();

        const newProject = {
            projectID: this.props.projectID,
            description: this.state.description
        }
        // if (newProfile.description.length === 0) {
        //     this.setState({
        //         errors: 'Content is required'
        //     })
        // } else {
            this.props.editProject(newProject)
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
                <ModalHeader toggle={this.toggle}>Edit Project</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit} autocomplete="off">
                        <Label for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" placeholder="Description" onChange={this.onChange} rows="3" style={{resize: "none"}} value={this.state.description}/>
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

export default connect(mapStateToProps, {editProject})(EditProject);
