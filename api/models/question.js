const mongoose = require("mongoose");

const Question = mongoose.model("question", {
    title: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        required: true
    },
    topic: {
        type: String,
        required: true
    },
    answers: [{
        text: {
            type: String
        },
        isValid: {
            type: Boolean
        }
    }]
});

module.exports = Question;
