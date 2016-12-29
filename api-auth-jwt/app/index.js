// app/indes.js
var express = require('express');
var apiRouter = express.Router();
var url = require('url');
var User = require('../models/user');
var nJwt = require('njwt'); // used to create, sign and verify tokens
var secureRandom = require('secure-random');
var config = require('../config'); // get config file

//
//var signingKey = secureRandom(256, {type: 'Buffer'}); // Create a highly random byte array of 256 bytes
//var base64SigningKey = signingKey.toString('base64');

// define the about route
apiRouter.get('/', function (req, res) {
    //console.log(url.parse(req.url,true).query)
    res.status(200).json({
        message: 'Welcome to the coolest API on earth!'
    });
});

// route to authenticate a user (POST /api/authenticate)
apiRouter.post('/authenticate', function(req,res){
    // find the user
    User.findOne({
        username: req.body.userName
    }, function(err, user){
        if (err) throw err;

        if (!user){
            res.status(401).json({
                success: false,
                message: 'Authentication failed. User not found'
            });
        }else if (user){
            // check if password matches
            if (user.password != req.body.password){
                res.status(401).json({
                    success : false,
                    message: 'Authentication failed. Wrong password'
                });
            }else {
                // if user is found and password is right
                 var claims = {
                    iss: "http://myapp.com/",  // The URL of your service
                    sub: user.username,    // The UID of the user in your system
                    scope: "self, admins" // change these accordingly
                    }

                 // create a token
                    var jwt = nJwt.create(claims, config.secret);
                    jwt.setExpiration(new Date().getTime() + (60*60*1000)); // One hour from now
                    //console.log(jwt);

                var token = jwt.compact();
                    //console.log(token);

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Enjoy your token!',
                    token: token
                });
            }

        }

    });

});

apiRouter.get('/users', function(req, res){
    User.find({}, function(err, users){
        if (err) throw err
        res.json(users);
    });

});


module.exports = apiRouter