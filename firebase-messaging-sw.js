importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.5.0/firebase-messaging.js');

const firebaseConf = {
  apiKey: "AIzaSyBUaKz446tKaEeWE3k7epn-12aMZXmj42U",
  authDomain: "dj-test-302805.firebaseapp.com",
  projectId: "dj-test-302805",
  storageBucket: "dj-test-302805.appspot.com",
  messagingSenderId: "399128526741",
  appId: "1:399128526741:web:4133fdceaed7053a17809c",
  measurementId: "G-RFZH4V1M3M"
}

firebase.initializeApp(firebaseConf);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = 'Background Message Title';
  const notificationOptions = {
    body: 'Background Message body.',
    icon: '/firebase-logo.png'
  };

  /* self.registration.showNotification(notificationTitle,
    notificationOptions); */
});