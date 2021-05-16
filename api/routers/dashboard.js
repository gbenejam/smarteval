const express = require("express");
const Exam = require("../models/exam");
const Question = require("../models/question");
const User = require("../models/user");
const Group = require("../models/group");

const auth = require("../middleware/auth");
const router = new express.Router();

//Gets the admin dashboard
router.get("/admin/dashboard", auth, async (req, res) => {
  try {
    const user = req.user;

    const currentExams = await Exam.find({endDate: {$gte: new Date()} });
    const latestExams = await Exam.find({endDate: {$lte: new Date()} });
    const questions = await Question.find({ creator: req.user._id });
    const users = await User.find({})
    const groups = await Group.find({creator: req.user._id})

    console.log(latestExams);
    const dashboard = {
      user: user._id,
      totalExams: currentExams.length,
      totalQuestions: questions.length,
      totalUsers: users.length,
      totalGroups: groups.length,
      latestExams: latestExams,
      currentExams: currentExams,
    };
    res.send(dashboard);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
