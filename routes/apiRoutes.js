const User = require('../models/User');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(app) {

    // Middleware function to authenticate JWT tokens
    // Any routes including this function will have to authenticate the JWT token
    // In the current scheme of things, only create messages route will require authentification
    // After decoding JWT token, the decoded.id will be included in the request body, to be passed to next() and be used as the identification of the client
    // The passed req.body.sender is necessary for the message model 
    const decodeJWT = function(req, res, next) {
        const token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, app.get('JWTKey'), function(err, decoded) { 
                if (err) {
                    res.json({ status: 401, message: 'Token expired or invalid' });
                } else {
                    User.find({_id: decoded.id})
                    .then(function(data) {
                        if (data.length > 0) {
                            req.body.sender = decoded.id;
                            next();
                        } else {
                            res.json({ status: 403, message: 'Id not present in database, old JWT conflict with testing codes. Deployed version will never see this' });
                        }
                    })
                    .catch(function(err) {
                        res.json({ status: 500, message: err });
                    });
                }
            });
        } else {
            res.json({ status: 401, message: 'Token not provided' });
        }
    }

    // Send all User id and usernames to client
    app.get('/api/user', function(req, res) {
        User.find({}, '-password')
        .then(function (data) {
            res.json({ status: 200, data: data, message: 'Users data retrieved successfully' });
        })
        .catch(function (err) {
            res.json({ status: 500, message: err });
        });        
    });

    // Creates a user
    // Does not automatically login the new user
    app.post('/api/user', function (req, res) {
        User.create(req.body)
        .then(function (data) {
            res.json({ status: 200, data: data.username, message: 'User created successfully' });
        })
        .catch(function (err) {
            if (err.name === 'MongoError') { // Duplicate entry errors are handled here
                res.json({ status: 403, message: err });
            } else {
                res.json({ status: 500, message: err });
            }
        });
    });

    // Sends all messages to client
    app.get('/api/message', function(req, res) {
        Message.find({})
        .populate('sender receiver', '-password')
        .then(function (data) {
            res.json({ status: 200, data: data, message: 'Messages data retrieved successfully' });
        })
        .catch(function (err) {
            res.json({ status: 500, message: err });
        });  
    });

    // Creates a message
    // Sender === receiver is allowed
    app.post('/api/message', decodeJWT, function(req, res) {
        Message.create(req.body)
        .then(function (data) {
            res.json({ status: 200, data: data, message: 'Message created successfully' });
        })
        .catch(function (err) {
            res.json({ status: 500, message: err });
        }); 
    });

    // Log-ins the user
    // This will first decrypt the password for the user to compare
    // Generates a JWT token, which will be sent back to client
    app.post('/api/user/login', function(req, res) {
        User.findOne({ username: req.body.username })
        .then(function(data) {
            if (!data) {
                res.json({ status: 401, message: 'No such user or bad request format' });
            } else {
                bcrypt.compare(req.body.password, data.password)
                .then(function(decrypted) {
                    if (!decrypted) {
                        res.json({ status: 401, message: 'Wrong password' });
                    } else {
                        const token = jwt.sign({ id: data.id }, app.get('JWTKey'), { expiresIn: '30m' });
                        res.json({ status: 200, data: { id: data.id, username: data.username, token: token }, message: 'User logged in succesfully' });                   
                    }
                });
            }
        })
        .catch(function(err) {
            res.json({ status: 500, message: err });
        });
    });
}