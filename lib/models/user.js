const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
    avatar: RequiredString,
    username: RequiredString,
    email: RequiredString,
    password: RequiredString,
    zip: RequiredNumber,
    comics: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comic'
        }
    ],
    tradeable: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comic'
        }
    ],
    wishlist: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comic'
        }
    ]
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