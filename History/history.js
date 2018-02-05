const fs = require('fs');

exports.history = (req, res) => {
    fs.readFile("./history/history.html", (err, data) => {
        res.send(data);
    });

};