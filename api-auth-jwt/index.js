// index.js
// get the packages we need
 var apiRouter = require('./app/index');
var bodyParser = require('body-parser');
const express = require('express') // un-opinionsted web framework
var mongoose = require('mongoose');
var app = express();

var morgan = require('morgan');

var jwt = require('jsonwebtoken') // used to create, sign and verify tokens
var config = require('./config'); // get config file
var User = require('./models/user'); // get our mongoose model

// configurations
var port = process.env.PORT || 3000;
mongoose.Promise = global.Promise;
mongoose.connect(config.databaseUrl); // connect to database
app.set('superSecret', config.secret) // secret variable

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//Middlewares in express
app.use((req, response, next) => {
  //console.log(request.headers)
  next()
})

// use morgan to log requests to the console
app.use(morgan('dev'));

// routes

//basic routes
app.get("/", (req, res) => {
     res.json({
         message: `Hello! The API is at http://localhost:${port}/api`
     });
});


app.get('/setup', (req,res) => {
    
    // create a sample user
    var nick = new User({
        name: 'Nick Cerminara',
        username: 'nick',
        password: 'password',
        admin: true
    });

    // save sample user
    nick.save(function(err) {
        if (err) throw err
        console.log('User Saved Succesfully')
        res.json({success: true});

    });
});


//API routes

app.use('/api', apiRouter);

//Global error handling
app.use((err,req, res, next) => {
    console.log(err);
    res.status(500).json({
        error: 'something broke'
    });
});

//start server
app.listen(port, err => {
    if (err) 
          return console.log('There was an issue  in starting the server :' + err);
     console.log('Magic happens at http://localhost:' + port);     

});

