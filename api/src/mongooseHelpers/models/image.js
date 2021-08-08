const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    filename: {
        required: true,
        type: String,
    },
    createdAt: {
        default: Date.now(),
        type: Date,
    },
});

// const imageModel = mongoose.model('Image', ImageSchema);
// module.exports = imageModel;

module.exports.imageModel = mongoose.model('Image', ImageSchema);