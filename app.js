const express = require('express');
const path = require("path");
const fs = require("fs");
const app = express();
const includesModule = require("./Includes/includes.js");
const findUsModule = require("./FindUs/findus.js");

const mainRoute = path.join(__dirname, "public");

app.use(express.static(mainRoute));

//Hitta hit
app.get("/findus", findUsModule.findUs);

//Ingår
app.get("/includes", includesModule.includes);

app.get("/history", function (req, res) {
    res.send("Såhär började det...");
});

app.get("/", function (req, res) {
    res.sendFile(mainRoute + "/index.html");
});
app.get("/*", function (req, res) {
    res.sendFile(mainRoute + "/index.html");
});

var server = app.listen(8080);