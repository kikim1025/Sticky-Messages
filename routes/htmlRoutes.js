module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('../client/public/index.html')
    })
}