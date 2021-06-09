const mongoose = require("mongoose");

const SolvedExam = mongoose.model("examUser", {
  examId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'Exam'
  },
  examCreator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  duration: {
    type: String,
    required: true,
  },
  initExam: {
    type: Date,
    required: true,
  },
  doneExam: {
    type: Date,
    required: true,
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
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  questions: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      answer: {
        type: String
      }
    }
  ],
  grade: {
    type: Number
  }
});

module.exports = SolvedExam;
