const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    nickname: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Messaage', messageSchema);

module.exports = Message;