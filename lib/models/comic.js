const mongoose = require('mongoose');
const { Schema } = mongoose;
const { RequiredString, RequiredNumber } = require('./required-types');

const schema = new Schema({
    comicId: RequiredNumber,
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

schema.static('exists', function(query) {
    return this.find(query)
        .count()
        .then(count => (count > 0));
});

module.exports = mongoose.model('Comic', schema);