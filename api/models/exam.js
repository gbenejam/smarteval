const mongoose = require("mongoose");

const Exam = mongoose.model("exam", {
  creator: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  code: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  questions: [{
      type: mongoose.Types.ObjectId
  }],
  groups: [{
    type: mongoose.Types.ObjectId
  }]
});

Exam.createIndexes();


module.exports = Exam;
