const path = require("path");

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.sendFile('client/build/index.html')
    });
}