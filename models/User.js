const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required'
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required'
    }
})

UserSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10)
    .then(function(hashed) {
        user.password = hashed;
        next();        
    })
    .catch(function(err) {
        res.json({status: 'error', message: err});
    });
});

module.exports = mongoose.model('User', UserSchema);