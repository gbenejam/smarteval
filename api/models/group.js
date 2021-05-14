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
      name: {
        type: String,
        required: true,
      },
      _id: {
        type: mongoose.Types.ObjectId,
        required: true
      },
    },
  ],
});

Group.createIndexes();

module.exports = Group;
