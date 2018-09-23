const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const { RequiredString } = require('./required-types');

const schema = new Schema({
    avatar: String,
    username: String,
    email: RequiredString,
    hash: RequiredString,
    zip: {
        type: Number,
        validate: {
            validator: function(v) {
                return /(^\d{5}$)/.test(v);
            },
            message: zip => `${zip.value} is not a valid zip code (e.g. 90210)!`
        },
        required: [true, 'User zip code is required (e.g. 90210)']
    }
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