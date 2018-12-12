const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MessageSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: 'Title is required'
    },
    body: {
        type: String,
        trim: true,
        required: 'Body text is required'
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