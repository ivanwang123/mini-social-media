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

const signToken = userID => {
    return jwt.sign({
        iss: 'jwtSecret',
        sub: userID
    }, 'jwtSecret', {expiresIn: "1h"});
}

router.post('/register', (req, res) => {
    const {username, password} = req.body;
    User.findOne({username}, (err, user) => {
        if (err)
            res.status(500).json({message: {msgBody: 'Error registering user', msgError: true}});
        if (user)
            res.status(400).json({message: {msgBody: 'Username is already taken', msgError: true}});
        else {
            const newUser = new User({username, password});
            newUser.save(err => {
                if (err)
                    res.status(500).json({message: {msgBody: 'Error registering user', msgError: true}});
                else
                    res.status(201).json({message: {msgBody: 'Account created successfully', msgError: false}});
            });
        }
    });
});

router.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    if (req.isAuthenticated()) {
        const {_id, username} = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, {httpOnly: true, sameSite: true});
        res.status(200).json({isAuthenticated: true, user: {_id, username}});
    }
});

router.get('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.clearCookie('access_token');
    res.json({user: {username: ""}, success:true});
});

router.get('/authenticated', passport.authenticate('jwt', {session: false}), (req, res) => {
    const {_id, username} = req.user;
    res.status(200).json({isAuthenticated: true, user: {_id, username}});
});

router.get('/:username', (req, res) => {
    User.findOne({username: req.params.username}, '-password', (err, user) => {
        console.log("GET USER", user);
        if (err) return res.status(404).json({user: null, success: false});
        if (user) {
            return res.status(200).json({user: user, success: true});
        } else
            return res.status(404).json({user: null, success: false});
    });
})

router.put('/:username/edit', passport.authenticate('jwt', {session: false}), upload.single('profilePic'), (req, res) => {
    User.findOne({username: req.params.username}, '-password', (err, user) => {
        if (err) return res.status(400).json({user: null});
        if (user) {
            user.bio = req.body.bio;
            if (req.file)
                user.profilePic = req.file.filename;
            user.save().then(u => {
                return res.status(200).json({user: u})
            })
        } else {
            return res.status(400).json({user: null})
        }
    })
})

module.exports = router;