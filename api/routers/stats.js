const express = require("express");
const Exam = require("../models/exam");
const Group = require("../models/group");

const auth = require("../middleware/auth");

const router = new express.Router();

// example stats object
const stats = {
  totalUsers: 10,
  totalGroups: 1,
  globalStats: {
    grades: {
      not_submitted: 1,
      fail: 2,
      pass: 2,
      great: 3,
      excellent: 2,
      not_graded: 0,
    },
    bestGrade: 10.0,
    averageGrade: 6.0
  },
  groups: [
    {
      name: "test",
      users: 10,
      groupStats: {
        grades: {
          notAssisted: 1,
          fail: 2,
          pass: 2,
          great: 3,
          excellent: 2,
          not_graded: 0
        },
        bestGrade: 10.0,
        averageGrade: 6.0
      }
    }
  ]
};

// Get statistics for a specific exam
router.get("/stats/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const exam = await Exam.findById(_id);
    if (!exam) {
      return res.status(404).send("Exam {} not found.", _id);
    }

    const stats2 = getExamStatistics(exam);
    res.send(stats);
  } catch (e) {
    res.status(500).send(e);
  }
});

async function getExamStatistics(exam) {
  const groupIds = exam.groups.map(group => group._id);
  const groups = await Group.find({ _id: { $in: groupIds } }) || [];

  const examStats = {};
  examStats.totalGroups = groups.length || 0;
  examStats.totalUsers = getTotalUsers(groups);
  examStats.globalStats = getGlobalStats(groups);

  console.log(groups)
  return null;
}

function getTotalUsers(groups) {
  let userCount = 0;
  groups.forEach(group => {
    let users = group.users || [];
    userCount += users.length;
  });
  return userCount;
}

module.exports = router;