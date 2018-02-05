const firebase = require('firebase');
const BookingManager = require("./bookingManager.js");
const Booking = require("./booking.js");

let config = {
    apiKey: "AIzaSyC6cL89hWY3EYQz5V2rScWyLEGpWTXhi7Q",
    authDomain: "sundreskoladb.firebaseapp.com",
    databaseURL: "https://sundreskoladb.firebaseio.com",
    projectId: "sundreskoladb",
    storageBucket: "",
    messagingSenderId: "815538261313"
};
firebase.initializeApp(config);

let bookingManager = new BookingManager(firebase.database());


exports.getUnavailableDates = (req, res) => {

    bookingManager.GetUnavailableDates((dates) => {
        res.json(dates);
    }, (error) => {
        res.status(500).send("Kunde ej hämta datum - oväntat fel.");
    });

};

exports.makeBooking = (req, res) => {

    let booking = new Booking(req.body.dates, req.body.toPay, req.body.firstName,
        req.body.lastName, req.body.personalIdentityNumber,
        req.body.streetAddress, req.body.zipCode, req.body.postTown,
        req.body.phoneNumber, req.body.email, req.body.bookingDate);

    bookingManager.MakeBooking(booking);

    res.status(200).json({status:"ok"})

};