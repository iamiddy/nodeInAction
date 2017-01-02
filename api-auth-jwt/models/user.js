// models/user.js
const mongoose = require('mongoose');

let userSchema = mongoose.Schema;

// create a Schema
userSchema = new userSchema({
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
userSchema.pre('save', function (next) {
    // get the current Date
    const currentDate = new Date();
    // change the updated_at field to current Date
    this.update_at = currentDate;
    // if created_at doesn't exist, add to that field
    if (!this.created_at){
        this.created_at = currentDate;
    }

    next();
});

module.exports = mongoose.model('User', userSchema);
