const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId(),
        ref: 'User',
        required: true
    },
    comicId: {
        type: Schema.Types.ObjectId(),
        ref: 'Comic',
        required: true
    },
    condition: {
        type: String,
        enum: ['good', 'poor', 'fair', 'new', 'excellent']
    }
});

module.exports = mongoose.model('Catalog', schema);