// app/indes.js
var express = require('express');
var apiRouter = express.Router();
var url = require('url');


// define the about route
apiRouter.get('/', function (req, res) {
    //console.log(url.parse(req.url,true).query)
    res.status(200).send('APIsssss');
});


module.exports = apiRouter