const express = require('express');

const { signup, login, updateProfile, updatePicture, checkImageKey, favouriteImage, getUserImages } = require('../controllers/user');

const { assignImageToUser } = require('../controllers/media');

const { image, upload, imageError, noneUpload } = require('../utils/multerFileUpload');

const { permission } = require('../controllers/auth');

const app = require('../app')


const router = express.Router();


router.post('/signup', signup);

router.post('/login', login);

router.get('/images',
    // permission, 
    getUserImages)

router.put('/updateProfile/:id', permission, updateProfile);
router.post('/updatePicture/:id', permission, checkImageKey, upload.single('photo'), imageError, updatePicture);


router.put('/addImage/:id', permission, assignImageToUser)    //id = userid
router.route('/favImage/:task/:id').put(permission, favouriteImage).get(permission, favouriteImage);

// router.post('/image/:id', permission, upload.single('photo'), imageError, image);

module.exports = router;
