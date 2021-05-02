const mongoose = require("mongoose");

const Group = mongoose.model("group", {
  creator: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
    },
  ],
});

Group.createIndexes();

module.exports = Group;
