const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comic: {
        type: Schema.Types.ObjectId,
        ref: 'Comic',
        required: true
    },
    condition: {
        type: String,
        enum: ['Good', 'Poor', 'Fair', 'New', 'Excellent', 'Unknown']
    }
});

module.exports = mongoose.model('Catalog', schema);