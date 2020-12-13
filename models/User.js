const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: '1590456586135defaultprofile.png'
    },
    projects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Project'}]
});

UserSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();
    bcrypt.hash(this.password, 10, (err, hash) => {
        if (err) return next(err);
        this.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) return cb(err);
        else
            if (!isMatch)
                return cb(null, isMatch);
            return cb(null, this);
    });
}

module.exports = User = mongoose.model('user', UserSchema);