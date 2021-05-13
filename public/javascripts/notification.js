const SERVER_KEY = "AAAAXO3p_5U:APA91bGo0bgQaaiJc_RYeKdrnmumRY4oez6h9jwTlwoyk6BRWbSgFvokSKOxVmNbxko-SdBpPfZu9hqLkACCvTRagqX4NiOhfYjFsCZLfvbzwlYMDpNoReGNwuGS5TZKWciRaOm3I6WS";

const firebaseConf = {
    apiKey: "AIzaSyBUaKz446tKaEeWE3k7epn-12aMZXmj42U",
    authDomain: "dj-test-302805.firebaseapp.com",
    projectId: "dj-test-302805",
    storageBucket: "dj-test-302805.appspot.com",
    messagingSenderId: "399128526741",
    appId: "1:399128526741:web:4133fdceaed7053a17809c",
    measurementId: "G-RFZH4V1M3M"
}

// Register Firebase in the Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register(`${location.origin}/firebase-messaging-sw.js`)
        .then((res) => {
            firebase.messaging().useServiceWorker(res);
            console.log("Service Worker Registered");
        });
    // notification().catch(err => console.log('sw error', err));
}

// Initialize Firebase App
firebase.initializeApp(firebaseConf);
const messaging = firebase.messaging();

// On Message function
messaging.onMessage(async (payload) => {
    // const token = await messaging.getToken()
    // console.log('TKN: ', token);
    console.log('MSG: ', payload)
    const notificationOption = {
        body: payload.notification.body,
        icon: '/public/images/notification.jpg'
    };    
    console.log(location.search.split('=')[1] === payload.data.userid);
    if (Notification.permission === "granted" && location.search.split('=')[1] === payload.data.userid) {
        var notification = new Notification(payload.notification.title, notificationOption);
        /* axios.post(`${window.location.origin}/notification/firebase`, {
            registrationToken: token
        }, {
            Headers: {
                'Content-type': 'application/json'
            }
        }) */
        notification.onclick = function (ev) {
            ev.preventDefault();
            window.open(payload.notification.click_action, '_blank');
            notification.close();
        }
    }
    /* messaging.deleteToken().then(res => {
        console.log('TOKEN DELETED: ', res);
        localStorage.removeItem('firebaseToken');
        // location.href = '/';
    }).catch(err => {
        console.log('TOKEN ERROR: ', err);
    }) */
});

const tokenGenerate = () => {
    /* firebase.initializeApp(firebaseConf);
    const messaging = firebase.default.messaging(); */
    // Generate firebase token
    messaging.getToken().then(dat => {
        localStorage.setItem('firebaseToken', dat);
        console.log('tkn: ', dat);
    }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
    })
}

const func = async () => {
    let tkn = localStorage.getItem('firebaseToken')
    console.log('tkn: ', tkn);

    // Call Firebase Custom API
    axios.post(`${window.location.origin}/notification/firebase/?userid=${localStorage.getItem('userid')}`, {
        registrationToken: tkn,
        // serverKey: SERVER_KEY
    }
        , {
            Headers: {
                'Content-type': 'application/json',
                'Authorization': `key=${SERVER_KEY}`
            }
        }
    )
    /* .then(res => {
        console.log('SUB RES: ', res);
    }) */
};

const subcribe = () => {
    let tkn = localStorage.getItem('firebaseToken')
    console.log('tkn: ', tkn);
    // Call Firebase Custom API
    axios.post(`${window.location.origin}/notification/subcribe/?userid=${localStorage.getItem('userid')}`, {
        registrationToken: tkn,
        // serverKey: SERVER_KEY
    }
        , {
            Headers: {
                'Content-type': 'application/json',
                'Authorization': `key=${SERVER_KEY}`
            }
        }
    )
    /* .then(res => {
        console.log('SUB RES: ', res);
    }).catch(err => {
        console.log('SUB ERR: ', err);
    }) */
};

const subNotif = async () => {
    let tkn = localStorage.getItem('firebaseToken')
    console.log('tkn: ', tkn);

    // Call Firebase Custom API
    axios.post(`${window.location.origin}/notification/bidNotification/?userid=${localStorage.getItem('userid')}`,
        /* {
            registrationToken: tkn,
            // serverKey: SERVER_KEY
        }, */
        {
            Headers: {
                'Content-type': 'application/json',
                'Authorization': `key=${SERVER_KEY}`
            }
        }
    )
    /* .then(res => {
        console.log('SUB RES: ', res);
    }) */
};

const unSubcribe = () => {
    let tkn = localStorage.getItem('firebaseToken')
    console.log('tkn: ', tkn);

    // Call Firebase Custom API
    axios.post(`${window.location.origin}/notification/unSubcribe/?userid=${localStorage.getItem('userid')}`, {
        registrationToken: tkn,
        // serverKey: SERVER_KEY
    }
        , {
            Headers: {
                'Content-type': 'application/json',
                'Authorization': `key=${SERVER_KEY}`
            }
        }
    )
    /* .then(res => {
        console.log('SUB RES: ', res);
    }).catch(err => {
        console.log('SUB ERR: ', err);
    }) */
}

const lout = () => {
    messaging.deleteToken().then(res => {
        console.log('TOKEN DELETED: ', res);
        localStorage.removeItem('firebaseToken');
        location.href = '/';
    }).catch(err => {
        console.log('TOKEN ERROR: ', err);
    })
}
