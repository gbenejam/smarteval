const mongoose = require('mongoose')
const questionSchema = require('./schemas/questionSchema')

const Question = mongoose.model('question', questionSchema)

module.exports = Question