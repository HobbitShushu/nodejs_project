const express = require('express');
const app = express();
const path = require('path')
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose')
const session = require('express-session')

const indexRouter = require('./api/routes/index')
const accountRouter = require('./api/routes/account')
const boardRouter = require('./api/routes/board')
const pictureRouter = require('./api/routes/picture')

// static file service
app.use(express.static('public'));

app.use(morgan('dev'));
app.use(express.static('uploads'));
app.use(bodyparser.urlencoded({ extended : false }));
app.use(bodyparser.json());

// session setting
app.use(session({
    secret: 'session@secret!',
    resave: false,
    saveUninitialized : true
}));

mongoose.connect(
    'mongodb+srv://'+
    process.env.MONGO_USERNAME + ":" + 
    process.env.MONGO_USERPASSWORD + 
    '@rest-r24i9.mongodb.net/test?retryWrites=true'
);

// CORS - Cross-Origin-Resource-Sharding
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Origin-Headers',
        'Origin, X-Requested-With, Context-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        req.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
        req.status(200).json({})
    }
    next();
});

app.use('/user', indexRouter);
app.use('/account', accountRouter);
app.use('/board', boardRouter);
app.use('/picture', pictureRouter);

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status(404);
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error : error.message
    });
});

module.exports = app;