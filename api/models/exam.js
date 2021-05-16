const mongoose = require("mongoose");

const Exam = mongoose.model("exam", {
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  duration: {
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
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  questions: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
  groups: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
  topics: [
    {
      _id: {
        type: mongoose.Types.ObjectId,
      },
      name: {
        type: String,
      },
    },
  ],
});

module.exports = Exam;
