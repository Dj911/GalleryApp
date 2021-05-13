module.exports = {
    database: {
        str:
            // "mongodb://host.docker.internal:27017/galleryapp?retryWrites=true&w=majority"
            'mongodb+srv://varshil:iAnDfqQv0hAHgnmK@cluster0.sctgr.mongodb.net/galleryapp?retryWrites=true&w=majority'
    },
    options: {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true
    },
    firebaseConfig: {
        apiKey: "AIzaSyBUaKz446tKaEeWE3k7epn-12aMZXmj42U",
        authDomain: "dj-test-302805.firebaseapp.com",
        projectId: "dj-test-302805",
        storageBucket: "dj-test-302805.appspot.com",
        messagingSenderId: "399128526741",
        appId: "1:399128526741:web:4133fdceaed7053a17809c",
        measurementId: "G-RFZH4V1M3M"
    }
}