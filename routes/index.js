var express = require('express');
const axios = require('axios');
const userRoute = require('./user');

const { getAllFiles } = require('../dbServices/mediaServiecs');
const { login } = require('../dbServices/user');

var router = express.Router();

router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/dashboard', (req, res, next) => {
    res.render('dashboard', {
        imageUrl: ''
        // token: 
    })
})

router.get('/gallery', async (req, res, next) => {      // TODO: Fav Images, Delete Images and update profile
    // console.log(token);
    const info = await getAllFiles();
    const { data } = info;
    // console.log('DATA: ',info);
    let url=[];
    info.forEach(el =>{        
        url.push({id: el._id,type: el.mediaType, url: el.url})
        // console.log('EL: ',url);
    })    
    res.render('gallery', {
        imageUrl: url
    },
    // {async: true}        //FOR USING ASYNC FUNCTION
    )
})

router.get('/favourites', async (req, res, next) => {
    const info = await getAllFiles();
    const { data } = info;
    // console.log('DATA: ',info);
    let url=[];
    info.forEach(el =>{
        if(el.isFavourite === true){
            url.push({type: el.mediaType, url: el.url})
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

router.post('/user', userRoute);

module.exports = router;
