// index.js

//require('./app/index');
const express = require('express')
const app = express()

const port = 3000

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

