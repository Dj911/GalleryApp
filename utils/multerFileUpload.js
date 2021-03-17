const media = require('../models/media')
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config({ path: "../config/config.env" });

const createError = require('http-errors');


const multer = require('multer');
var path = require('path')


aws.config.update({
    secretAccessKey: "aFooXdwjsFbNDEISsrGrSZbqG0mLnpNN+Qs5dLyI",
    accessKeyId: "AKIAR65GL72HD6GCLV7A",
    region: 'ap-south-1'
});

s3 = new aws.S3();

const noneUpload = multer();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "galleryappdj/userProfile",
        key: function (req, file, cb) {
            console.log('FILE: ', file);
            cb(null, '[' + Date.now() + ']' + file.originalname); //use Date.now() for unique file keys
        }
    })
});

const mediaUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "galleryappdj/media",
        acl: 'public-read',
        key: function (req, file, cb) {
            // console.log('FILE: ', file);
            cb(null, '[' + Date.now() + ']' + file.originalname); //use Date.now() for unique file keys
        }
    })
});


// NORMAL LOCAL STORAGE
/* const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending .jpg
    }
})
const upload = multer({ storage: storage }) */


const image = async (req, res, next) => {       // Add a single image for User
    try {        
        if (req.file === undefined) {     // UPLOADING MULTIPLE FILES            
            let filesData;
            for (const key in req.files) {                
                let type = req.files[key].mimetype.split('/')[0];                
                filesData = await media.create({
                    user: req.params.id,
                    mediaType: type,
                    url: req.files[key].location,
                    user: req.params.id
                })
            }
            res.status(200).json({
                status: 'Success',
                data: filesData
            })
        } else {                                              // UPLOADING ONLY A SINGLE FILE
            let type = req.file.mimetype.split('/')[0];
            const data = await media.create({
                user: req.params.id,
                mediaType: type,
                url: req.file.location,
                user: req.params.id
            })
            res.status(200).json({
                status: 'Success',
                data: data
            })
        }
        // next();
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

const imageError = (req, res, next) => {       // if upload file is empty
    try {        
        if (!req.file && req.file !== undefined) {
            throw new Error('File Error!!')
        }
        next();
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

// # This function for delete file from s3 bucket

const deleteObj = async (key) => {
    var params = {
        Bucket: 'galleryappdj/userProfile',
        Key: key
    };

    return s3.deleteObject(params, function (err, data) {
        if (err) return err;  // error
        else {
            console.log('Deleted!')
            return null;    // deleted
        }
    });
}

// list all media files inside Media folder
const listMediaObj = async (req, res, next) => {
    let params = {
        Bucket: 'galleryappdj', /* required */
        Prefix: 'media'  // Can be your folder name
    };
    s3 = new aws.S3();
    let data = await s3.listObjects(params
        , function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else {
                console.log(data);    // successful response
            };
        }).promise();
    return data.Contents;
}

const listUserObj = async (key) => {
    var params = {
        Bucket: 'galleryappdj',
        Prefix: 'userProfile'
    };

    const info = await s3.listObjects(params, function (err, data) {
        if (err) console.log(err); // an error occurred
        else {
            // console.log(data);    // successful response
        }
    }).promise();
    return info.Contents;
}

module.exports = { upload, image, imageError, deleteObj, noneUpload, mediaUpload, listMediaObj, listUserObj }