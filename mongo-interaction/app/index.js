// app/index.js

var User = require('./models/user');

// create a new user called chriss

var chris = new User({
    name: 'James',
    username: 'hamis',
    password: 'password',
    admin: true
});

// call the custom method. this will just add -dude to his name
// user will now be Chris-dude

// chris.dudify((err,name) => {
//     if (err) throw err;
//     console.log('Your name is ' + name);
// });

// chris.save(err => {
//     if (err) throw err;
//     console.log('User saved successfully');
// });

// Read
User.find({}, function(err, users){
    if (err) throw err;
    console.log(users);
});

// ger user 
User.find({username: 'james'}, function(err,user){
    if (err) throw err;

    console.log(user);
});

User.findById('5855f65b668266a4cdd3c583', function(err, user) {
    if (err) throw err;
    // show the one user
    console.log("here \n " + user);

});

//Querying
// get admin that was created in the past month

// get the date 1 month ago

var monthAgo = new Date();
monthAgo.setMonth(monthAgo.getMonth() -1);
User.find({admin : true}).where('created_at').gt(monthAgo).exec(function(err, users){
   if (err) throw err

   console.log(users); 
});

//GET A USER, THEN UPDATE
//get a user with ID
User.findById('5855f65b668266a4cdd3c583', function(err, user) {
    if (err) throw err;
    // show the one user
    console.log("here \n " + user);
    user.location = 'uk';

    // save the user
    user.save(function(err){
        if (err) throw err
        console.log('User successfully update!');

    });

});