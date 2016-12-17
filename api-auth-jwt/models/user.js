// models/user.js
var mongoose = require('mongoose');

module.exports = mongoose.model('User', new Schema({
    name: String,
    password: String,
    admin: Boolean
}));
