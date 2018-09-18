const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    avatar: String,
    username: RequiredString,
    email: RequiredString,
    hash: String,
    zip: Number,
});

schema.methods = {
    generateHash(password) {
        this.hash = bcrypt.hashSync(password, 8);
    },
    comparePassword(password) {
        return bcrypt.compareSync(password, this.hash);
    }
};

module.exports = mongoose.model('User', schema);