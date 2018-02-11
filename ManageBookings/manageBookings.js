const firebaseSetup = require("../firebaseSetup.js");
const BookingManager = require("./bookingManager.js");
const Booking = require("./booking.js");
const customValidation = require('../customValidation/customValidations.js');
const accountModule = require("../Account/account.js");

const firebase = firebaseSetup.getFirebase();

let bookingManager = new BookingManager(firebase.database());

exports.getUnavailableDates = (req, res) => {

    bookingManager.GetUnavailableDates((dates) => {
        res.json(dates);
    }, (error) => {
        res.status(500).send("Kunde ej hämta datum - oväntat fel.");
    });

};

exports.makeBooking = (req, res) => {

    let errorStrings = [];

    customValidation.validateDates(req.body.dates, errorStrings);

    customValidation.validateCurrency(req.body.toPay + '', errorStrings);

    customValidation.validateIdentityNumber(req.body.personalIdentityNumber, errorStrings);

    customValidation.hasValue("Förnamn", req.body.firstName, errorStrings);

    customValidation.hasValue("Efternamn", req.body.lastName, errorStrings);

    customValidation.hasValue("Gatuadress", req.body.streetAddress, errorStrings);

    customValidation.hasValue("Postnummer", req.body.zipCode, errorStrings);

    customValidation.hasValue("Stad", req.body.postTown, errorStrings);

    customValidation.hasValue("Telefonnummer", req.body.phoneNumber, errorStrings);

    customValidation.validateDate(req.body.bookingDate, errorStrings);

    customValidation.validateEmail(req.body.email, errorStrings);

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

exports.getAllBookings = (req, res) => {
    accountModule.getCurrentUser((user) => {

        if (user == null) {
            res.status(401).send("Kräver inloggning. Var god logga in.");
            return;
        }

        if (user.role == "admin") {
            bookingManager.GetAllBookings(bookings => {
                res.json(bookings);
            }, error => {
                res.status(500).send("Kunde ej hämta bokningar - oväntat fel.");
            });
        }
        else {
            res.status(403).send("Användaren är ej behörig - kräver admin-behörighet");
        }
    });
}
