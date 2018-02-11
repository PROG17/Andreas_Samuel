const firebase = require('firebase');

let firebaseConfig = {
    apiKey: "AIzaSyC6cL89hWY3EYQz5V2rScWyLEGpWTXhi7Q",
    authDomain: "sundreskoladb.firebaseapp.com",
    databaseURL: "https://sundreskoladb.firebaseio.com",
    projectId: "sundreskoladb",
    storageBucket: "",
    messagingSenderId: "815538261313"
};

firebase.initializeApp(firebaseConfig);

exports.getFirebase = () => {
    return firebase;
}


