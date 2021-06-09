const mongoose = require("mongoose");

const Topic = mongoose.model("topic", {
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  }
});

Topic.createIndexes();

module.exports = Topic;
