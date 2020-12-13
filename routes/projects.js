const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportConfig = require('../config/passport');
const jwt = require('jsonwebtoken');

const Post = require('../models/Post');
const Project = require('../models/Project');
const User = require('../models/User');

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

// get all projects
router.get('/', (req, res) => {
    Project.find()
        .sort({date: -1})
        .then(projects => res.status(200).json(projects))
})

// get user's projects
router.get('/:username/projects', (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if (user) {
                Project.find({'_id': {$in: user.projects}}, (err, docs) => {
                    res.status(200).json(docs);
                })
            } else {
                res.status(404).json(null)
            }
        })
        .catch(err => res.status(404).json(null))
});

router.get('/:username/projects/:project', (req, res) => {
    User.findOne({username: req.params.username})
        .then(user => {
            if (user) {
                Project.find({'title': {$in: req.params.project}, 'username':{$in: req.params.username}}, (err, docs) => {
                    res.status(200).json(docs[0]);
                })
            } else {
                res.status(404).json(null)
            }
        })
        .catch(err => res.status(404).json(null))
})

router.get('/category/:category', (req, res) => {
    Project.find({'category':req.params.category})
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => res.status(400).json(null))
})

// get a project 
router.get('/:id', (req, res) => {
    Project.findById(req.params.id)
        .then(project => res.status(200).json(project))
        .catch(err => res.status(404).json({project: null}))
})

// create a project
router.post('/create', passport.authenticate('jwt', {session: false}), upload.single('image'), (req, res) => {
    const newProject = new Project({
        title: req.body.title,
        description: req.body.description,
        username: req.body.username,
        image: req.file ? req.file.filename : '',
        category: req.body.category
    });
    newProject.save()
        .then(project => {
            req.user.projects.push(project);
            req.user.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: 'Error creating project', msgError: true}});
                else
                    res.status(200).json(project)
            });
        });
})

router.put('/follower/follow',  passport.authenticate('jwt', {session: false}), (req, res) => {
    Project.findById(req.body.projectID)
        .then(project => {
            if (!project.followers.includes(req.body.user)) {
                project.followers.push(req.body.user);
                project.save()
                    .then(p => {
                        res.status(200).json(p);
                    })
            } else {
                res.status(400).json(null);
            }
        })
        .catch(err => res.status.json(null))
});

router.put('/follower/unfollow', passport.authenticate('jwt', {session: false}), (req, res) => {
    Project.findById(req.body.projectID)
        .then(project => {
            const index = project.followers.indexOf(req.body.user);
            if (index > -1) {
                project.followers.splice(index, 1);
                project.save()
                    .then(p => {
                        res.status(200).json(p);
                    })
            } else {
                res.status(200).json(project);
            }
        })
        .catch(err => res.status.json(null))
});

router.get('/search/:term', (req, res) => {
    Project.find({$text: {$search:req.params.term, $caseSensitive:false}})
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(err => res.status(400).json(null));
})

router.put('/:projectID/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
    Project.findById(req.params.projectID)
        .then(project => {
            project.description = req.body.description;
            project.save()
                .then(p => {
                    res.status(200).json(p);
                })
        })
        .catch(err => {
            res.status(400).json(null);
        })
})

module.exports = router;