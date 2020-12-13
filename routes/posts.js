const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Project = require('../models/Project');
const Post = require('../models/Post');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now()+file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png')
        cb(null, true);
    else
        cb(null, false);
}

const upload = multer({storage: storage, limits: {fileSize:1024*1024*10}, fileFilter: fileFilter});

router.post('/create', passport.authenticate('jwt', {session: false}), upload.single('image'), (req, res) => {
    const newPost = new Post({
        content: req.body.content,
        image: req.file ? req.file.filename : ''
    });
    console.log("NEW POST", newPost);
    newPost.save()
        .then(post => {
            Project.findById(req.body.projectID)
                .then(project => {
                    if (project) {
                        project.posts.push(post);
                        console.log("PROJECT", project);
                        project.save(err => {
                            if (err)
                                res.status(400).json({message: {msgBody: 'Error creating post', msgError: true}});
                            else
                                res.status(200).json(post);
                            
                        })
                    } else {
                        res.status(400).json(null);
                    }
                })
        })
        .catch(err => {
            res.status(400).json({message: {msgBody: 'Error creating post', msgError: true}});
        })
})

router.get('/:projectID/posts', (req, res) => {
    Project.findById(req.params.projectID)
            .then(project => {
                if (project) {
                    Post.find({'_id': {$in: project.posts}}, null, {sort: {date: -1}}, (err, docs) => {
                        res.status(200).json(docs);
                    })
                } else {
                    res.status(404).json(null)
                }
            })
            .catch(err => {
                res.status(400).json(null);
            })
})

module.exports = router;