// app/models/user.js
var mongoose = require('mongoose');

var config = require('../../config')

// to address (node:3341) DeprecationWarning: Mongoose: mpromise
//http://stackoverflow.com/questions/38138445/node3341-deprecationwarning-mongoose-mpromise
mongoose.Promise = global.Promise;

mongoose.connect(config.databaseUrl);

var Schema = mongoose.Schema;

// create a Schema

var userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    update_at: Date
});

//custom method to add string to end of the name
// can create more important methods like name validation or formatting
//you can also do queries and find similar userSchema

userSchema.methods.dudify = function() {
    // add some stuff to the users name
    this.name = this.name + '-dude';
};

// on every save, add the Date
userSchema.pre('save', function(next){
    // get the current Date
    var currentDate = new Date();

    // change the updated_at field to current Date
    this.update_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at) 
        this.created_at = currentDate;

        next();

});

// Schema is useless so far
// need to create model using it
var User = mongoose.model('User',userSchema);

// make this available to our users in our Node applications
module.exports = User;