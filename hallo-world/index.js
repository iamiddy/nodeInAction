// index.js

//require('./app/index');
const express = require('express') // un-opinionsted web framework
const bodyParser = require('body-parser'); // json response body
const rp = require('request-promise') // remote APIs invocation
const app = express()
app.use(bodyParser.json()); // json responses.

const port = 3000

const users = []

//Middlewares in express
app.use((request, response, next) => {
  //console.log(request.headers)
  next()
})

app.use((request, response, next) => {
    request.chance = Math.random()
    next()
})

app.get('/', (request, response) => {
   response.json({
       chance: request.chance
   })
})


// error handling
app.get('/error', (request, response) => {
    throw new Error('oops')
})

app.post('/users', (request,response) =>{
    // retrieve user posted data from the body
    const user = request.body

    users.push(user)
   
    response.status(201).json({
        message: 'User created successfully'
    })
})

app.get('/users', (req,res) => {
    res.json(users)
})

app.get('/weather/:city', (request, response) => {
    rp({
        uri: 'http://apidev.accuweather.com/locations/v1/search',
        qs: {
            q: request.params.city,
            apiKey: 'e0OMpjurmmhZfGhvAuBeIBAUpWX2EP7I' // use own wheather channel key
        },
        json: true,
    })
    .then((data) => {
        response.json(data)
    })
    .catch((err) => {
        console.log(err)
        response.json({
            "error" : err
        })
    })
})

app.use((err,request,response, next) => {
    console.log(err)
    response.status(500).json({
        error: 'something broke'
    })
})


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
})

