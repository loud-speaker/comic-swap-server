const mongoose = require('mongoose');
const { Schema } = mongoose;
// const { RequiredString } = require('./required-types');

const schema = new Schema({
    //your schema model
});

module.exports = mongoose.model('Thing', schema);