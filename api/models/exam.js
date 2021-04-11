const mongoose = require('mongoose')
const questionSchema = require('./schemas/questionSchema')

const Exam = mongoose.model('exam', {
    code: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    }
    //questions: [questionSchema]
})

module.exports = Exam