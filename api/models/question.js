const mongoose = require("mongoose");

const Question = mongoose.model("question", {
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
});

module.exports = Question;
