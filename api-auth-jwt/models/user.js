// models/user.js
var mongoose = require('mongoose');

var userSchema = mongoose.Schema;

// create a Schema
var userSchema = new userSchema({
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

module.exports = mongoose.model('User', userSchema);
