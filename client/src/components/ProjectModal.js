import React, {Component} from 'react';
import {createProject} from '../actions/projectActions';
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
    Input,
} from 'reactstrap';


class ProjectModal extends Component {
    state = {
        modal: false,
        title: '',
        description: '',
        image: '',
        category: '',
        errors: ''
    }
    static propTypes = {
        project: PropTypes.object.isRequired
    }
    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        })
    }
    onClick = (e) => {

    }
    handleFile = (e) => {
        this.setState({
            image: e.target.files[0]
        })
    }
    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit = (e) => {
        e.preventDefault();

        var formData = new FormData();
        if (this.state.image !== '')
            formData.append('image', this.state.image, this.state.image.filename);
        formData.append('title', this.state.title);
        formData.append('description', this.state.description);
        formData.append('username', this.props.username);
        formData.append('category', this.state.category);
        console.log(this.props.username)

        if (this.state.title.length === 0) {
            this.setState({
                errors: 'Title is required'
            })
        } else if (this.state.description.length === 0) {
            this.setState({
                errors: 'Description is required'
            })
        } else if (this.props.project.projects.filter(p => p.title.trim() === this.state.title.trim()).length > 0) {
            this.setState({
                errors: 'Project with that title is already created'
            })
        } else if (this.state.category.length === 0) {
            this.setState({
                errors: 'Category is required'
            })
        } else {
            this.props.createProject(formData);
            this.setState({
                errors: ''
            })
            this.toggle();
        }

    }
    render() {
        const categories = require('../categories').categories;
        return (
            <div>
            <button className="project-btn colored-btn" onClick={this.toggle}>+ Project</button>
            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                <ModalHeader toggle={this.toggle}>New Project</ModalHeader>
                <ModalBody>
                    <Form onSubmit={this.onSubmit} autocomplete="off">
                        <Label for="title">Title</Label>
                        <Input type="text" name="title" id="title" placeholder="Title" onChange={this.onChange}/>
                        <Label className="mt-3" for="description">Description</Label>
                        <Input type="textarea" name="description" id="description" placeholder="Description" onChange={this.onChange} rows="5" style={{resize: "none"}}/>
                        <Input className="mt-3" type="file" name="image" onChange={this.handleFile}/>
                        <Input className="mt-3" type="select" name="category" onChange={this.onChange}>
                            <option onClick={this.onClick} value="">--Category--</option>
                            {categories.map(category => (
                                <option onClick={this.onClick} value={category}>{category}</option>
                            ))}
                        </Input>
                        <p className="mt-3 ml-3">{this.state.errors}</p>
                        <button className="colored-btn p-2 pl-3 pr-3" color="primary">Create</button>
                    </Form>
                </ModalBody>
                {/* <ModalFooter>
                <Button color="primary" onClick={this.toggle}>Create</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter> */}
            </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    project: state.project
})

export default connect(mapStateToProps, {createProject})(ProjectModal);
