const mongoose = require("mongoose");

const Exam = mongoose.model("exam", {
  code: {
    type: String,
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
  questions: [{
      objectId: mongoose.Types.ObjectId
  }]
});

module.exports = Exam;