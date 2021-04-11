const mongoose = require('mongoose')

var questionSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

module.exports = questionSchema