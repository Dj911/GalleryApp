const express = require('express');

const { signup, login, updateProfile, updatePicture, checkImageKey, favouriteImage, getUserProfileImages, getUserImages, deleteImage } = require('../controllers/user');

const { uploadUserImage } = require('../controllers/media');

const { image, upload, imageError, noneUpload, mediaUpload } = require('../utils/multerFileUpload');

const { permission } = require('../controllers/auth');

const app = require('../app')


const router = express.Router();


router.post('/signup', signup);

router.post('/login', login);

router.get('/profileImage/:id', permission, getUserProfileImages);
router.get('/images/:id', permission, getUserImages);

router.put('/updateProfile/:id', permission, updateProfile);
router.post('/updatePicture/:id', permission, upload.single('photo'), imageError, updatePicture);


router.post('/addImage/:id', permission, mediaUpload.array('photo', 10), imageError, image)    //id = userid
router.put('/deleteImage/:id', permission, deleteImage)    //id = userid
router.route('/favImage/:task/:id').put(permission, favouriteImage).get(permission, favouriteImage);        // GET, UPDATE, DELETE Fav Images of User

// router.post('/image/:id', permission, upload.single('photo'), imageError, image);

module.exports = router;
