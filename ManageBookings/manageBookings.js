const firebase = require('firebase');
const BookingManager = require("./bookingManager.js");
const Booking = require("./booking.js");
const validator = require('validator');

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


function validateDate(date, errorStrings) {

    let isDate = validator.matches(date, /^\d{4}-\d{2}-\d{2}$/);
    if (!isDate)
        errorStrings.push(`Ej korrekt datumformat: ${date}`);
}


function validateDates(dates, errorStrings) {

    if (dates == null || dates.length == 0) {
        errorStrings.push(`Minst ett datum är obligatoriskt`);
        return;
    }

    for (let date of dates) {
        validateDate(date, errorStrings);
    }

}

function hasValue(name, value, errorStrings) {
    if (value == null || value == "") {
        errorStrings.push(`${name} är obligatoriskt`);
        return false;
    }

    return true;
}

function validateCurrency(currency, errorStrings) {

    if (!hasValue("Belopp", currency, errorStrings))
        return;

    let isCurrency = validator.isCurrency(currency);

    if (!isCurrency)
        errorStrings.push(`Ej korrekt angivet belopp: ${currency}`);

}

function validateIdentityNumber(identityNumber, errorStrings) {

    if (!hasValue("Personnummer", identityNumber, errorStrings))
        return;

    let isIdentityNumber = validator.matches(identityNumber, /^\d{6}-\d{4}$|^\d{8}-\d{4}$/);

    if (!isIdentityNumber)
        errorStrings.push(`Ej korrekt personnummer: ${identityNumber}`);

}

function validateEmail(email, errorStrings) {

    if (!hasValue("Email", email, errorStrings))
        return;

    let isEmail = validator.isEmail(email);

    if (!isEmail)
        errorStrings.push(`Ej korrekt email: ${email}`);

}

exports.makeBooking = (req, res) => {

    let errorStrings = [];

    validateDates(req.body.dates, errorStrings);

    validateCurrency(req.body.toPay + '', errorStrings);

    validateIdentityNumber(req.body.personalIdentityNumber, errorStrings);

    hasValue("Förnamn", req.body.firstName, errorStrings);

    hasValue("Efternamn", req.body.lastName, errorStrings);

    hasValue("Gatuadress", req.body.streetAddress, errorStrings);

    hasValue("Postnummer", req.body.zipCode, errorStrings);

    hasValue("Stad", req.body.postTown, errorStrings);

    hasValue("Telefonnummer", req.body.phoneNumber, errorStrings);

    validateDate(req.body.bookingDate, errorStrings);

    validateEmail(req.body.email, errorStrings);

    if (errorStrings.length > 0) {
        res.status(400).json({ validationErrors: errorStrings, status: "Kunde ej validera postad data" });
        return;
    }


    let booking = new Booking(req.body.dates, req.body.toPay, req.body.firstName,
        req.body.lastName, req.body.personalIdentityNumber,
        req.body.streetAddress, req.body.zipCode, req.body.postTown,
        req.body.phoneNumber, req.body.email, req.body.bookingDate);

    bookingManager.MakeBooking(booking);

    res.status(200).json({ status: "ok" })

};