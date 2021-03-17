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
            cb(null, file.originalname); //use Date.now() for unique file keys
        }
    })
});

const mediaUpload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "galleryappdj/media",
        acl: 'public-read',
        key: function (req, file, cb) {
            console.log('FILE: ', file);
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
        console.log(req.file.location)
        let type = req.file.mimetype.split('/')[0];
        const data = await media.create({
            user: req.params.id,
            mediaType: type,
            url: req.file.location
        })
        res.status(200).json({
            status: 'Success',
            data: data
        })
        // next();
    } catch (err) {
        return next(createError(400, err, { expose: false }))
    }
}

const imageError = (req, res, next) => {
    try {
        if (!req.file) {
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

module.exports = { upload, image, imageError, deleteObj, noneUpload, mediaUpload, listMediaObj }