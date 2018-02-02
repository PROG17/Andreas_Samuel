const fs = require('fs');

exports.findUs = (req, res) => {
    fs.readFile("./findus/findus.html", (err, data) => {
        res.send(data);
    });

};