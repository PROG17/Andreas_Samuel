const fs = require('fs');

exports.includes = (req, res) => {
    fs.readFile("./includes/includes.html", (err, data) => {
        res.send(data);
    });

};