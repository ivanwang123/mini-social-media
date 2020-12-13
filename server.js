const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

// connect to mongodb
const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Mongoose connected'))
        .catch(err => console.log(err));

// static file
app.use('/uploads', express.static('uploads'));

// cookie parser
app.use(cookieParser());

// body parser
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// routes
app.use('/user', require('./routes/users'));
app.use('/project', require('./routes/projects'));
app.use('/post', require('./routes/posts'));

// listen to port
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}`))