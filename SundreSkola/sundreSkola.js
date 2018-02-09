const fs = require('fs');

exports.sundreSkola = (req, res) => {
    fs.readFile("./sundreskola/sundreskola.html", (err, data) => {
        res.send(data);
    });

};