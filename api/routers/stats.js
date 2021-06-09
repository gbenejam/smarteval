const express = require("express");
const Exam = require("../models/exam");
const Group = require("../models/group");
const SolvedExam = require("../models/solvedExam");

const auth = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

/* 
Example stats object:
const stats = {
  totalUsers: 10,
  totalGroups: 1,
  globalStats: {
    grades: {
      failed: 10,
      passed: 15,
    },
    bestGrade: 10.0,
    averageGrade: 6.0,
  },
  groups: [
    {
      name: "test",
      users: 10,
      groupStats: {
        grades: {
          failed: 10,
          passed: 15,
        },
        bestGrade: 10.0,
        averageGrade: 6.0,
      },
    },
  ],
};
*/

const PASS_MARK = 5;

// Get statistics for a specific exam
router.get("/api/stats/:id", auth, async (req, res) => {
  const _id = req.params.id;
  let totalGroups = 0;

  try {
    const stats = await Exam.findById(_id)
      .then(async item => {
        totalGroups = item.groups.length;
        return await Group.find({ _id: { $in: item.groups } })
          .then(async groups => await processGroups(groups, _id));
      });

    res.send({
      totalGroups: totalGroups,
      ...stats
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

async function processGroups(groups, examId) {
  // find the grades for each group
  const groupPromises = groups.map(group => new Promise(async (resolve, reject) => {
    const groupData = {
      name: group.name,
      users: group.users.length
    };
    const userIds = group.users.map(user => user._id);
    await SolvedExam.find({ user: { $in: userIds }, examId: examId })
      .then(async solvedExams => {
        const groupGradesArray = solvedExams.map(solvedExam => solvedExam.grade);

        // if not all exams have been submited we add null values for the missing exams
        if (groupGradesArray.length < group.users.length) {
          const missing = group.users.length - groupGradesArray.length;
          const missingArray = new Array(missing);
          groupData.groupGrades = [...missingArray, ...groupGradesArray];
        } else {
          groupData.groupGrades = groupGradesArray;
        }

        resolve(groupData);
      });
  }));

  // after all the solved exams have been retrieved from the DB we calculate the stats
  return await Promise.all(groupPromises).then(groupsDataArray => {
    const result = {};
    result.groups = [];
    let globalGrades = [];
    let totalUsers = 0;

    groupsDataArray.forEach(groupData => {
      totalUsers += groupData.groupGrades.length;
      globalGrades = [...globalGrades, ...groupData.groupGrades];
      const groupStats = getGradesStats(groupData.groupGrades);
      result.groups.push({
        name: groupData.name,
        users: groupData.users,
        groupStats: groupStats
      });
    });

    // with the grades of each group we can calculate the global stats
    result.totalUsers = globalGrades.length;
    result.globalStats = getGradesStats(globalGrades);
    return result;
  });
}

function getGradesStats(grades) {
  let best = 0;
  let gradesSum = 0;
  const gradesHistory = {
    failed: 0,
    passed: 0,
    pendingEvaluation: 0
  };

  grades.forEach(grade => {
    if (grade) {
      // check if we have a new best grade
      if (grade > best) {
        best = grade;
      }
      // update gradesSum - used to compute the average
      gradesSum += grade;
      // update gradesHistory object
      if (grade >= PASS_MARK) {
        gradesHistory.passed += 1;
      } else {
        gradesHistory.failed += 1;
      }
    } else {
      gradesHistory.pendingEvaluation += 1;
    }
  });

  const gradedExams = gradesHistory.failed + gradesHistory.passed;
  let averageGrade = gradesSum / (gradedExams || 1);
  if (!gradedExams) {
    // if no graded exams yet then we don't display grades statistics
    averageGrade = null;
    best = null;
  }

  return {
    grades: gradesHistory,
    bestGrade: best,
    averageGrade: averageGrade
  }
}

module.exports = router;
