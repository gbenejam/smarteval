const mongoose = require("mongoose");

const Question = mongoose.model("question", {
    title: {
        type: String,
        required: true
    },
    questionType: {
        type: String,
        required: true
    }
});

module.exports = Question;
