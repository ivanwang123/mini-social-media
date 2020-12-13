import React, {Component} from 'react';
import {createPost} from '../actions/postActions';
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


class ProjectModal extends Component {
    state = {
        modal: false,
        content: '',
        image: '',
        errors: ''
    }
    static propTypes = {
        project: PropTypes.object.isRequired,
        createPost: PropTypes.func.isRequired,
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    onSubmit = (e) => {
        e.preventDefault();

        if (this.state.content.length === 0) {
            this.setState({
                errors: 'Content is required'
            })
        } else {
            var formData = new FormData();
            if (this.state.image !== '')
                formData.append('image',this.state.image, this.state.image.name);
            formData.append('content',this.state.content);
            formData.append('projectID',this.props.projectID);
    
            this.props.createPost(formData);
            this.setState({
                errors: ''
            })
            this.toggle();
        }

    }
    render() {
        return (
            <div className="ml-3">
            <button className="colored-btn" onClick={this.toggle}>Post</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New Post</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit} autocomplete="off">
                        <Label for="content">Content</Label>
                        <Input type="textarea" name="content" id="content" placeholder="Content" onChange={this.onChange} rows="5" style={{resize: "none"}}/>
                        <Input className="mt-3" type="file" name="image" accept=".png .jpeg" onChange={this.handleFile}/>
                        <p className="mt-3 ml-3">{this.state.errors}</p>
                        <button className="colored-btn p-2 pl-3 pr-3" color="primary">Post</button>
                    </Form>
                </ModalBody>
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: state.project
})

export default connect(mapStateToProps, {createPost})(ProjectModal);
