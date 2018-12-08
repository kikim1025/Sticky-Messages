const User = require('../models/User');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(app) {

    // Middleware function to authenticate JWT tokens
    const decodeJWT = function(req, res, next) {
        const token = req.headers[`x-access-token`];
        try {
            if (token) {
                jwt.verify(token, app.get('JWTKey'), function(err, decoded) { 
                    if (err) {
                        throw err.message;
                    } else {
                        req.body.decoded_id = decoded.id;
                        next();
                    }
                });
            } else {
                throw `No token provided`;
            }
        } catch(err) {
            res.json({status: `error`, message: err});
        }
    }

    // Send all User id and usernames to client
    app.get(`/api/user`, function(req, res) {
        User.find({}, `-password`)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });        
    });

    // Creates a user
    // Does not automatically login the new user
    app.post('/api/user', function (req, res) {
        User.create(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
    });

    // Sends all messages to client
    app.get(`/api/message`, function(req, res) {
        Message.find({})
        .populate(`sender receiver`, `-password`)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });  
    });

    // Creates a message
    // Sender === receiver is allowed
    app.post(`/api/message`, decodeJWT, function(req, res) {
        try {    
            if (req.body.decoded_id === req.body.sender) {
                Message.create(req.body)
                .then(function (data) {
                    res.json(data);
                })
                .catch(function (err) {
                    res.json({status: `error`, message: err});
                }); 
            } else {
                throw `Wrong sender id`
            }
        } catch (err) {
            res.json({status: `error`, message: err});
        }
    });

    // Log-ins the user
    app.post(`/api/user/login`, function(req, res) {
        User.findOne({username: req.body.username})
        .then(function(data) {
            if (!data) {
                throw `No such user or bad request format`
            } else {
                bcrypt.compare(req.body.password, data.password)
                .then(function(decrypted) {
                    console.log(decrypted);
                    if (!decrypted) {
                        throw `Wrong password`;
                    } else {
                        const token = jwt.sign({ id: data.id }, app.get(`JWTKey`), { expiresIn: `1h` });
                        res.json({status: `success`, message: `Logged in`, data: { id: data.id, username: data.username, token: token }});                   
                    }
                });
            }
        })
        .catch(function(err) {
            res.json({status: `error`, message: err});
        });
    });
}