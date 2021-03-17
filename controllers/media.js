const { getAllFiles, addUserImage } = require('../dbServices/mediaServiecs');
const createError = require('http-errors');
const { jwtTokenGenerator, jwtTokenVerification } = require('../utils/token')
const user = require('../models/user')
const media = require('../models/media')
const { image, upload, deleteObj } = require('../utils/multerFileUpload');
const { findByIdAndUpdate } = require('../models/user');

exports.getAllImages = async (req, res, next) => {      // FORM DATABASE NOT S3
    try {
        const data = await getAllFiles();        
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

