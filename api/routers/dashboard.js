const express = require("express");
const Exam = require("../models/exam");
const Question = require("../models/question");
const User = require("../models/user");
const Group = require("../models/group");

const auth = require("../middleware/auth");
const router = new express.Router();

//Gets the admin dashboard
router.get("/api/dashboard/admin", auth, async (req, res) => {
  try {
    const user = req.user;

    const exams = await Exam.find({creator: user._id });
    const currentExams = await Exam.find({endDate: {$gte: new Date()}, creator: user._id });
    const latestExams = await Exam.find({endDate: {$lte: new Date()}, creator: user._id });
    const questions = await Question.find({ creator: req.user._id });
    const users = await User.find({})
    const groups = await Group.find({creator: req.user._id})

    const dashboard = {
      user: user._id,
      totalExams: exams.length,
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

//Gets the user dashboard
router.get("/api/dashboard/user", auth, async (req, res) => {
  try {
    const user = req.user;
    const now = new Date().getTime();

    const exams = await Group.find({ users: user }).then(async (groups) => {
        return await Exam.find({groups: {$in : groups}})
      }).then((allExams) => {
          const currentExams = allExams.filter(d => {
            const startDate = d.startDate.getTime();
            const endDate = d.endDate.getTime();
            return (startDate < now && endDate > now)
          });
          const pastExams = allExams.filter(d => {
            const endDate = d.endDate.getTime();
            return (endDate < now)
          });
          const futureExams = allExams.filter(d => {
            const startDate = d.startDate.getTime();
            return (startDate > now)
          });
          const dashboard = {
          user: user._id,
          futureExams: futureExams,
          currentExams: currentExams,
          pastExams: pastExams
        };
      res.send(dashboard);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
