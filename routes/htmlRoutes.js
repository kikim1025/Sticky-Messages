module.exports = function(app) {
    app.get('/', function(req, res) {
        res.send('../client/build/index.html')
    })
}