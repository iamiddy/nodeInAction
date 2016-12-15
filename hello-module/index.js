// index.js
 var exchange = require('./app/index');
const express = require('express') // un-opinionsted web framework
const bodyParser = require('body-parser'); // json response body
const app = express();

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json()); // json responses.

const port = 3000;


app.use('/exchanges', exchange);

//error handling
app.use((err,request,response, next) => {
    console.log(err)
    response.status(500).json({
        error: 'something broke'
    })
})


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})
