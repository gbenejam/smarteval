const mongoose = require("mongoose");
const validator = require("validator");

const User = mongoose.model("user", {
  name: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid.");
      }
    },
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      if (value.toLowerCase().includes("password")) {
        throw new Error("Password can't be password.");
      }
    },
    trim: true,
    minlength: 7,
  },
  isAdmin: {
    type: Boolean,
    required: true,
  },
});

module.exports = User;
