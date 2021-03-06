const { create, find, login, update, getUserById } = require('../dbServices/user');
const { updateImage, getUserImages, deleteImage, getImage } = require('../dbServices/mediaServiecs');
const createError = require('http-errors');
const { jwtTokenGenerator, jwtTokenVerification } = require('../utils/token');
const joi = require('../validation/userValidation')

const { handleResponse } = require('../common/middleware/requestHandler')

const bcrypt = require('bcrypt');

const user = require('../models/user')
const media = require('../models/media')
const { image, upload, deleteObj, listMediaObj, listUserObj } = require('../utils/multerFileUpload');
const { findByIdAndUpdate } = require('../models/user');
// upload.single('photo'), image


// const multer = require('multer');
// const upload = multer({ dest: './public/images/' })

exports.signup = async (req, res, next) => {
    try {
        // console.log(req.file.key)
        // req.body.imageKey = req.file.key
        console.log(req.body)
        const valid = joi.validate(req.body);
        if(valid.error) {
            console.log('ERROR: ',valid.error.message)
            return valid.error.message
        }else{
            req.body.password = await bcrypt.hash(req.body.password, 12);
            const data = await create(req.body);
            handleResponse({res,statusCode: 200,msg: 'Success',data});
            /* res.status(200).json({
                status: 'Success',
                data: data
            }) */
            // next();
        }
    } catch (err) {
        // console.log(err.stack)
        return next(createError(400, err, { expose: false }))
    }
}

exports.login = async (req, res, next) => {    
    try {
        if (!req.body.email || !req.body.password) { return next(createError(400, "Please enter credentials", { expose: false })) }
        const data = await find(req.body);
        const passwordMatch = await bcrypt.compare(req.body.password, data.password);
        if (!passwordMatch) {
            return next(createError(400, "Wrong Password", { expose: false }));
        }
        const token = jwtTokenGenerator(data._id);
        data.token = token;
        // req.session.login = true;
        data.updatedAt = Date.now();
        data.tokenExpire = Date.now() + 60 * 60 * 1000  // 1 hr
        await data.save({
            validateBeforeSave: false,
        })
        // const updatedUser = await update(data._id, { token: token, tokenExpire: Date(parseInt(Date.now() / 1000) + process.env.JWT_EXPIRE) })
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Success',
            token: token,
            data: data
        }) */
        next();
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        if (req.body === "") {
            return next(createError(400, "Empty Body", { expose: false }))
        }
        const bodyArr = ["name", "email", "mobileNumber"]; //user can only update from this fields
        for (let i of Object.keys(req.body)) {
            //excluding other fields from req.body
            if (!bodyArr.includes(i)) {
                delete req.body[i];
            }
        }
        req.body.updatedAt = Date.now();
        const newUser = await update(req.params.id, req.body);
        await newUser.save();
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Success Update',
            data: newUser
        }) */
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.checkImageKey = async (req, res, next) => {     // Check if user db has an profile image url or not
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

exports.updatePicture = async (req, res, next) => {     // Delete if an existing profile image is there and then update the new image in s3 and DB
    try {
        const user = await getUserById(req.params.id);
        if (user.imageKey !== undefined || user.imageKey !== "") {      // DELETE EXISTING PROFILE PICTURE ON S3 FIRST UPDATE
            const dataDelete = await deleteObj(user.imageKey);
            console.log('DATA: ', dataDelete);
        }
        req.body.imageKey = req.file.location;
        const data = await update(req.params.id, { imageUrl: req.body.imageKey, imageKey: req.file.key })
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Success',
            data: data
        }) */
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.favouriteImage = async (req, res, next) => {        // Add, REmove or Get Favourites images for User
    try {
        const data = await updateImage(req.body.imageId, req.params.id, req.params.task); //(imageid,userid)    
        console.log('DATA: ', data)
        if (data.length === 0) return next(createError(400, "No Favourites found!", { expose: false }))
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Success!',
            data: data
        }) */
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

let s3Data = []
exports.getUserProfileImages = async (req, res, next) => {       // Get User's Profile Image url
    try {
        const data = await getUserById(req.params.id);
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Success!',
            imageUrl: data.imageUrl
        }) */
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

exports.getUserImages = async (req, res, next) => {         // Get All the Images assigned to a User
    try {        
        const data = await getUserImages(req.params.id).select("-user");
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Success!',
            imageUrl: data
        }); */
    } catch (err) {
        return next(createError(400, err, { expose: false }));
    }
}

exports.deleteImage = async (req, res, next) => {
    try {
        const image = await getImage(req.body.imageId);
        console.log('IMAGE: ', image);
        const dataDelete = await deleteObj(image.imageKey);
        const data = await deleteImage(req.body.imageId);
        handleResponse({res,statusCode: 200,msg: 'Success',data});
        /* res.status(200).json({
            status: 'Image Deleted!'
            // imageUrl: data
        }); */
    } catch (err) {
        return next(createError(400, err, { expose: false }));
    }
}