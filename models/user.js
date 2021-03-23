const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const bcrypt = require('bcrypt');

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

/* userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    next();
}) */
const user = db.model('user', userSchema);

module.exports = user;
