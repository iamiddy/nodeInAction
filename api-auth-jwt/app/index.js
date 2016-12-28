// app/indes.js
var express = require('express');
var apiRouter = express.Router();
var url = require('url');
var User = require('../models/user');

// define the about route
apiRouter.get('/', function (req, res) {
    //console.log(url.parse(req.url,true).query)
    res.status(200).json({
        message: 'Welcome to the coolest API on earth!'
    });
});

apiRouter.get('/users', function(req, res){
    User.find({}, function(err, users){
        if (err) throw err
        res.json(users);
    });

});

module.exports = apiRouter