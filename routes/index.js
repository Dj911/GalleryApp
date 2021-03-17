var express = require('express');
const userRoute = require('./user');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard', {
        userImage: "false",
        // token: 
    })
})

router.get('/favourites', (req, res, next) => {
    res.render('favourites.html', {
        admin: false
    })
})
router.get('/gallery', (req, res, next) => {
    res.render('gallery', {
        admin: false
    })
})

router.post('/user', userRoute);

module.exports = router;
