const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
        index: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: '1590461588404defaultproject.jpeg'
    },
    category: {
        type: String,
        required: true
    },
    followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});
ProjectSchema.index({title:'text', description:'text'});


module.exports = Project = mongoose.model('project', ProjectSchema);