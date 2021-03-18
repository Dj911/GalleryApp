const mongoose = require('mongoose');
const db = require('../connections/dbMaster');

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobileNumber: Number,
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: Date,
    token: String,
    imageUrl: {
        type: String
    },
    imageKey: String,
    tokenExpire: Date,
    isActive: {
        type: Boolean,
        default: true
    }
}, { collection: 'user' })

const user = db.model('user', userSchema);

module.exports = user;