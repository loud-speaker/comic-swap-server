const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
    avatar: String,
    username: RequiredString,
    email: RequiredString,
    password: RequiredString,
    zipcode: RequiredNumber
});

module.exports = mongoose.model('User', schema);