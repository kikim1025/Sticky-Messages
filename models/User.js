const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        required: 'Username is required',
        minlength: 1,
        maxlength: 15
    },
    password: {
        type: String,
        trim: true,
        required: 'Password is required',
        minlength: 1,
        maxlength: 15
    }
})

// Encrypt password before saving
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