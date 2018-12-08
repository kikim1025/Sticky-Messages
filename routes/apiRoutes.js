const User = require('../models/User');
const Message = require('../models/Message');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

module.exports = function(app) {

    // Middleware function to authenticate JWT tokens
    const authJWT = function(req, res, next) {
        const token = req.headers["x-access-token"];
        try {
            if (token) {
                
            } else {
                throw "No token provided";
            }
        } catch(err) {
            res.json({status: "error", message: err});
        }
    }


    // Send all User id and usernames to client
    app.get("/api/user", function(req, res) {
        User.find({}, "-password")
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });        
    });

    // Creates a user
    app.post('/api/user', function (req, res) {
        //need to check if already existing user, then just login, not create if password match
        User.create(req.body)
        .then(function (data) {
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });
    });
    ///////add checks

    // Sends all messages to client
    app.get("/api/message", function(req, res) {
        Message.find({})
        .then(function (data) {
            console.log(data[1]);//array data
            res.json(data);
        })
        .catch(function (err) {
            res.json(err);
        });  
    });

    // Creates a message
    app.post("/api/message", function(req, res) {
        // check if receiver exists. 
        // by this point sender must exist(JWT auth) so no check needed.
        // sender === receiver is allowed
        const sender = req.body.sender;//jwt
        const receiver = req.body.receiver;

        User.find({_id: receiver})
        .then(function(data) {
            if (data.length !== 0) {
                Message.create(req.body)
                .then(function (messageData) {
                    res.json(messageData);
                })
                .catch(function (err) {
                    res.json({status: "error", message: "Invalid request data"});
                });
            } else {
                throw "Receiver does not exist"
            }   
        })
        .catch(function (err){
            res.json({status: "error", message: err});
        });
    });



    // Logins the user
    app.post(`/api/user/login`, function(req, res) {
        User.findOne({username: req.body.username})
        .then(function(data) {
            if (!data) {
                throw `No such user or bad request format`
            } else {
                bcrypt.compare(req.body.password, data.password, function(decrypted) {
                    if (!decrypted) {
                        throw `Wrong password`
                    } else {
                        const token = jwt.sign({ id: data.id }, appRef.get(`JWTKey`), { expiresIn: `1h` });
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