const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const mediaSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    mediaType: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    url: String,
    isFavourite: {
        type: Boolean,
        default: false
    }
}, { connection: 'media' })

const media = db.model('media', mediaSchema);
module.exports = media;