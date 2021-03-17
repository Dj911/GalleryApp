const { create, find, login, update, getUserById } = require('../dbServices/user');
const { updateImage } = require('../dbServices/mediaServiecs');
const createError = require('http-errors');
const { jwtTokenGenerator, jwtTokenVerification } = require('../utils/token');

const user = require('../models/user')
const media = require('../models/media')
const { image, upload, deleteObj, listMediaObj } = require('../utils/multerFileUpload');
const { findByIdAndUpdate } = require('../models/user');
// upload.single('photo'), image


// const multer = require('multer');
// const upload = multer({ dest: './public/images/' })

exports.signup = async (req, res, next) => {
    try {
        // console.log(req.file.key)
        // req.body.imageKey = req.file.key
        console.log(req.body)
        const data = await create(req.body);
        res.status(200).json({
            status: 'Success',
            data: data
        })
        // next();
    } catch (err) {
        // console.log(err.stack)
        return next(createError(400, err, { expose: false }))
    }
}

exports.login = async (req, res, next) => {
    try {
        if (!req.body.email || !req.body.password) { return next(createError(400, "Please enter credentials", { expose: false })) }
        console.log('LOGIN...')
        const data = await login(req.body);
        if (!data) { return next(createError(400, "Please enter valid credentials", { expose: false })) }
        const token = jwtTokenGenerator(data._id);
        data.token = token;
        data.updatedAt = Date.now();
        data.tokenExpire = Date.now() + 60 * 60 * 1000  // 1 hr
        await data.save({
            validateBeforeSave: false,
        })
        // const updatedUser = await update(data._id, { token: token, tokenExpire: Date(parseInt(Date.now() / 1000) + process.env.JWT_EXPIRE) })
        res.status(200).json({
            status: 'Success',
            token: token,
            data: data
        })
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const bodyArr = ["mobileNumber", "email"]; //user can only update from this fields
        for (let i of Object.keys(req.body)) {
            //excluding other fields from req.body
            if (!bodyArr.includes(i)) {
                delete req.body[i];
            }
        }
        req.body.updatedAt = Date.now();
        const newUser = await update(req.params.id, req.body);
        await newUser.save();
        res.status(200).json({
            status: 'Success Update',
            data: newUser
        })
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.checkImageKey = async (req, res, next) => {
    try {
        const data = await getUserById(req.params.id);
        if (data.imageKey) {
            deleteObj(data.imageKey);   // Delletes image on s3 if it already exists
        }
        next();
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.updatePicture = async (req, res, next) => {
    try {
        req.body.imageKey = req.file.key
        const data = await update(req.params.id, { imageKey: req.body.imageKey })
        console.log(req.file)
        res.status(200).json({
            status: 'Success',
            data: data
        })
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.favouriteImage = async (req, res, next) => {
    try {
        const data = await updateImage(req.body.imageId, req.params.id, req.params.task);    //(imageid,userid)
        res.status(200).json({
            status: 'Success!',
            data: data
        })
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

let s3Data = []
exports.getUserImages = async function () {
    try {
        const data = await listMediaObj();
        console.log(data)
    } catch (err) {

    }
}