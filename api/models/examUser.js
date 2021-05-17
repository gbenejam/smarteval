const mongoose = require("mongoose");

const Exam = mongoose.model("examUser", {
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
  initExam: {
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
      creator: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      questionType: {
        label: {
          type: String,
        },
        value: {
          type: String,
        },
      },
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
      options: [
        {
          type: String,
        },
      ],
      answer: {
        type: String,
        required: true
      }
    }
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
  grade: {
    type: Number
  }
});

module.exports = Exam;
