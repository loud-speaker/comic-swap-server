const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
    avatar: String,
    username: RequiredString,
    email: RequiredString,
    password: RequiredString,
    zipcode: RequiredNumber
});

schema.methods = {
    generateHash(password) {
        this.hash = bcrypt.hashSync(password, 8);
    },
    comparePassword(password) {
        return bcrypt.compareSync(password, this.hash);
    }
}

module.exports = mongoose.model('User', schema);