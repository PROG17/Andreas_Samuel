const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express();

const sundreSkolaModule = require("./sundreskola/sundreskola.js");
const accountModule = require("./account/account.js");
const includesModule = require("./Includes/includes.js");
const findUsModule = require("./FindUs/findus.js");
const historyModule = require("./History/history.js");
const manageBookingsModule = require("./ManageBookings/manageBookings.js");

const mainRoute = path.join(__dirname, "public");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(mainRoute));


//logga in
app.post('/login', accountModule.login);
//Hämta behörighet för användaren
app.get('/getLoggedInStatus', accountModule.getLoggedInStatus);
//Hantera Bokningar
app.get('/getUnavailableDates', manageBookingsModule.getUnavailableDates);

app.post('/makeBooking', manageBookingsModule.makeBooking);

app.get('/getAllBookings', manageBookingsModule.getAllBookings);
//Hitta hit
app.get("/findus", findUsModule.findUs);

//Sundre skola(homepage)
app.get("/sundreskola", sundreSkolaModule.sundreSkola);

//Ingår
app.get("/includes", includesModule.includes);

app.get("/history", historyModule.history);

app.get("/", function (req, res) {
    res.sendFile(mainRoute + "/index.html");
});
app.get("/*", function (req, res) {
    res.sendFile(mainRoute + "/index.html");
});

var server = app.listen(8080);