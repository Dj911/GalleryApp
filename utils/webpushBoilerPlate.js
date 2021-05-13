require('dotenv').config();
const router = require('express').Router();

const webPush = require('web-push');
webPush.setGCMAPIKey(process.env.GOOGLE_API_KEY);

webPush.setVapidDetails(
    'mailto:dharmaraj.jadeja@solulab.co',
    process.env.PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
)

// Payload for notification
const testData = {
    title: "Testing",
    body: "It's a success!",
    // icon: "/path/to/an/icon.png"
};

let subscription;
let pushIntervalId;

//SUBSCRIBE ROUTE
router.post('/register', (req, res, next) => {
    // GET pushSubscription obj
    subscription = req.body;
    console.log('SUBS: ', subscription);

    res.status(201);

    webPush.sendNotification(subscription, JSON.stringify(testData)).catch((e) => {
        console.log('PAYLOAD ERROR!!',e)
        clearInterval(pushIntervalId);
    });

    /* pushIntervalId = setInterval(() => {          // to send notification even when tab is closed
        webPush.sendNotification(subscription, JSON.stringify(testData)).catch((e) => {
            console.log('PAYLOAD ERROR!!',e)
            clearInterval(pushIntervalId);
        });
    },3000); */
});

module.exports = router;