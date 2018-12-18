const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required',
        minlength: 1,
        maxlength: 15
    },
    body: {
        type: String,
        trim: true,
        required: 'Body text is required',
        minlength: 1,
        maxlength: 300
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Sender is required'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'Receiver is required'
    }
})

module.exports = mongoose.model('Message', MessageSchema);