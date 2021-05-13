const mongoose = require('mongoose');
const db = require('../connections/dbMaster');
const bcrypt = require('bcrypt');

const notificationSchema = new mongoose.Schema({
    
});

const notification = db.model('Notification',notificationSchema);

module.exports = notification;