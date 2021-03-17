const express = require('express');

const { image, upload, imageError, noneUpload, mediaUpload } = require('../utils/multerFileUpload');
const { getAllImages } = require('../controllers/media');


const { permission } = require('../controllers/auth');

const app = require('../app')


const router = express.Router();

router.post('/image', permission, mediaUpload.single('photo'), imageError, image);       // ONly admin can add files in the media folder

router.get('/images', permission, getAllImages);

module.exports = router;