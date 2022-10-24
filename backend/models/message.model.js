const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
});

const Message = mongoose.model('Messaage', messageSchema);

module.exports = Message;