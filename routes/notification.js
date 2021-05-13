const express = require('express');
const axios = require('axios');
const fb = require('firebase/app');
const admin = require("firebase-admin");

const user = require('../models/user')
const { getUserById } = require('../dbServices/user');


const serviceAccount = require("../dj-test-302805-firebase-adminsdk-9ywqi-373e732516.json");
// const { response } = require('../app');

// INITIALIZE FIREBASE ADMIN APP
const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const notification_options = {
    priority: "high",
    timeToLive: 60 * 60 * 24
};

const router = express.Router();

router.post('/firebase', async (req, res,next) => {
    try {
        // Would require a registration token from the FE side
        const registrationToken = req.body.registrationToken;
        console.log('BODY: ', req.body)
        // "el5zEjYOxyiaHqoQPvrQ7V:APA91bFsfy1pJJD-8ZGXZFnwGu3Xr6aRpzc6ao_g1hSCILFQipfncbkKKwfgRdM75O_J8oZmx-DICqvFFSvGyOzwXutdrn8H-VwDguYJMjY5Hek4tQwLyODM2cedDNHgi-y1DYQW-FWD";

        /* //? MESSAGE BODY FOR sendToTopic
        const message = {
            notification: {
                title: "NFT Bid",
                body: "Testing",
                // clickAction: "http://localhost:4000/notification",
            },
            data: req.query
            // token: registrationToken
            // "to": registrationToken
        }; */

        //? MESSAGE BODY FOR SEND
        /* const message = {
            notification: {
                title: "NFT Bid",
                body: "Testing",
                // clickAction: "http://localhost:4000/notification",
            },
            token: registrationToken
            // "to": registrationToken
        }; */
        //? MESSAGE BODY FOR SEND TO DEVICE
        const message = {
            "notification": {
                "title": "NFT Bid",
                "body": "Testing",
                "clickAction": "http://localhost:4000/"
            },
            data: req.query
            // token: registrationToken
            // "to": registrationToken
        };
        //req.body.message;
        const options = notification_options;

        // USING LEGACY HTTP REQUEST
        /* axios.post('https://fcm.googleapis.com/fcm/send', {
            "notification": {
                "title": "test",
                "body": "Testing notification 2",
                "click_action": "http://localhost:4000/",
            },
            // token: registrationToken
            "to": "fKMkGLUdd_dbRwMFyV4Gc0:APA91bHrspw_C0nTZraVs_GuZ_S77kWopTjMNgoUarZXmVqqDY2MGAguvNl-4pASapOAK3JUJWBw-1SiX5dI7h0ytAgxshastYmYKGipaYAcR5ywxqfaBeK11_Ga2wnMvFYPkz6rG601"
        }, {
            Headers: {
                'Content-Type': 'application/json',
                'Authorization': 'key = AAAAXO3p_5U:APA91bGo0bgQaaiJc_RYeKdrnmumRY4oez6h9jwTlwoyk6BRWbSgFvokSKOxVmNbxko-SdBpPfZu9hqLkACCvTRagqX4NiOhfYjFsCZLfvbzwlYMDpNoReGNwuGS5TZKWciRaOm3I6WS'
                // `key="${req.body.serverKey}"`
            }
        }).then(data=>{
            console.log('AXIOS DATA:',data);
            res.status(200).json(data);
        }).catch(err=>{
            console.log('ERROR: ',err);
            res.status(400).json(err);
        }) */

        //? Send to Topic
        const appMessage = await app.messaging().sendToTopic('Bid', message)
        //? SEND
        // const appMessage = await app.messaging().send(message)

        //? SEND TO DEVICE
        // const appMessage = await app.messaging().sendToDevice(registrationToken, message, notification_options)
        /* .then(response => {
        })
        .catch(error => {
            console.log(error);
        }); */
        console.log('RES: ', appMessage)
        next();
    } catch (error) {
        console.log('ERROR: ', error)
    }
});

router.post('/subcribe', (req, res, next) => {
    try {
        const registrationToken = req.body.registrationToken;
        console.log('BODY: ', req.body)
        // "el5zEjYOxyiaHqoQPvrQ7V:APA91bFsfy1pJJD-8ZGXZFnwGu3Xr6aRpzc6ao_g1hSCILFQipfncbkKKwfgRdM75O_J8oZmx-DICqvFFSvGyOzwXutdrn8H-VwDguYJMjY5Hek4tQwLyODM2cedDNHgi-y1DYQW-FWD";

        //? Subscribe to a topic
        app.messaging().subscribeToTopic(registrationToken, 'Bid').then(res => {
            console.log('Subscribe to Bids notification');
        }).catch(err => {
            console.log('Subcription Error: ', err);
        });
        res.status(200).json({
            status: 'Success'
        });
        next();
    } catch (error) {
        console.log('ERROR: ', error)
    }
});

router.post('/unSubcribe', (req, res, next) => {
    try {
        const registrationToken = req.body.registrationToken;
        console.log('BODY: ', req.body)
        // "el5zEjYOxyiaHqoQPvrQ7V:APA91bFsfy1pJJD-8ZGXZFnwGu3Xr6aRpzc6ao_g1hSCILFQipfncbkKKwfgRdM75O_J8oZmx-DICqvFFSvGyOzwXutdrn8H-VwDguYJMjY5Hek4tQwLyODM2cedDNHgi-y1DYQW-FWD";

        //? Subscribe to a topic
        app.messaging().unsubscribeFromTopic(registrationToken, 'Bid').then(res => {
            console.log('Un-Subscribed to Bids notification');
        }).catch(err => {
            console.log('Subcription Error: ', err);
        });
        res.status(200).json({
            status: 'Success'
        });
        next();
    } catch (error) {
        console.log('ERROR: ', error)
    }
})

router.post('/bidNotification', async (req, res, next) => {
    try {

        //? MESSAGE BODY FOR sendToTopic
        const message = {
            notification: {
                title: "NFT Bid",
                body: "Testing",
                // clickAction: "http://localhost:4000/notification",
            },
            data: req.query
            // token: registrationToken
            // "to": registrationToken
        };

        //? Send to Topic
        const appMessage = await app.messaging().sendToTopic('Bid', message)
        console.log('RES: ', appMessage)
        res.status(200).json({
            status: 'Success'
        });
        next();
    } catch (error) {
        console.log('ERROR: ', error)
    }
})

module.exports = router;