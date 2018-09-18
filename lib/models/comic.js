const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
    id: RequiredNumber,
    issueName: RequiredString,
    volumeName: RequiredString,
    coverDate: RequiredString,
    description: RequiredString,
    image: RequiredString,
    characters: [String],
    personCredits: [{
        name: String,
        role: String
    }]
});

module.exports = mongoose.model('Comic', schema);