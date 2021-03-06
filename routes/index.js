var express = require('express');
const axios = require('axios');
const userRoute = require('./user');

const app = require('../app')

const { getAllFiles, getUserImages } = require('../dbServices/mediaServiecs');
const { login } = require('../dbServices/user');

var router = express.Router();

/* router.get('', (req, res, next) => {
    req.session.login = false;
    next();
}) */

router.get('/', function (req, res, next) {
    res.render('../views/');
});

router.get('/notification', async (req, res, next) => {
    // if (!req.session.login) res.render('index');
    const info = await getUserImages(req.params.userid);
    const { data } = info;
    let url = [];
    info.forEach(el => {
        url.push({ userId: el.user, imageId: el._id })
        // console.log('EL: ',url);
    })
    res.render('notification', {
        imageUrl: url
        // token: 
    })
})

router.get('/dashboard', async (req, res, next) => {
    if (!req.session.login) res.render('index');

    const info = await getUserImages(req.params.userid);
    const { data } = info;
    let url = [];
    info.forEach(el => {
        url.push({ userId: el.user, imageId: el._id })
        // console.log('EL: ',url);
    })
    res.render('dashboard', {
        imageUrl: url
        // token: 
    })
})

router.get('/gallery', async (req, res, next) => {
    if (!req.session.login) res.render('index');

    console.log('UID: ', req.query.userid);
    const info = await getUserImages(req.query.userid);
    const { data } = info;
    let url = [];
    info.forEach(el => {
        url.push({ id: el._id, type: el.mediaType, url: el.url })
        // console.log('EL: ',url);
    })
    res.render('gallery', {
        imageUrl: url
    },
        // {async: true}        //FOR USING ASYNC FUNCTION
    )
})

router.get('/favourites', async (req, res, next) => {
    if (!req.session.login) res.render('index');


    const info = await getUserImages(req.query.userid);
    const { data } = info;
    // console.log('DATA: ',info);
    let url = [];
    info.forEach(el => {
        if (el.isFavourite === true) {
            url.push({ id: el._id, type: el.mediaType, url: el.url })
        }
        // console.log('EL: ',url);
    })
    res.render('favourites', {
        imageUrl: url
    })
})

/* router.post('/uploadFile', async (req,res,next)=>{
    let useid = window.localStorage.getItem('userid');
    let token = window.localStorage.getItem('token');
    res.send(`/user/addImage/${userid}`);
    res.render('dashboard')
}) */

module.exports = router;
