// app/index.js

var User = require('./models/user');

// create a new user called chriss

var chris = new User({
    name: 'Chris',
    username: 'james',
    password: 'password'
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude

chris.dudify((err,name) => {
    if (err) throw err;
    console.log('Your name is ' + name);
});

chris.save(err => {
    if (err) throw err;
    console.log('User saved successfully');
});