const express = require("express");
const Exam = require("../models/exam");
const Group = require("../models/group");
const SolvedExam = require("../models/solvedExam");

const auth = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

// example stats object
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

// Get statistics for a specific exam
router.get("/stats/:id", auth, async (req, res) => {
  let totalGroups = 0;
  let totalUsers = 0;
  let failed = 0;
  let passed = 0;
  let best = 0.0;
  let average = 0.0;

  const _id = req.params.id;
  try {
    const exam = await Exam.findById(_id)
      .then(async (item) => {
        totalGroups = item.groups.length;
        return await Group.find({ _id: { $in: item.groups } });
      })
      .then((groups) => {
        let counter = 0;
        const users = [];
        //Setting number of groups
        groups.forEach((group) => {
          const usersGroup = group.users;
          users.push(usersGroup);
          group.users.forEach(() => {
            ++counter;
          });
        });
        totalUsers = counter;
        return users;
      })
      .then(async (users) => {
        const usersId = [];
        users[0].forEach((user) => {
          const id = user._id;
          usersId.push(id);
        });
        return await SolvedExam.find({ user: { $in: usersId }, examId: _id });
      })
      .then((solved) => {
        let passedCounter = 0;
        let failedCounter = 0;
        let grades = [];
        solved.forEach((exam) => {
          if (!exam.grade || exam.grade < 5) {
            ++failedCounter;
          } else if (exam.grade >= 5) {
            ++passedCounter;
          }
          if (exam.grade) {
            const grade = exam.grade;
            grades.push(grade);
          }
        });
        console.log(grades)
        let total = 0;
        for (let i = 0; i < grades.length; i++) {
          total += grades[i];
        }
        function arrayMax(arr) {
          if(arr === undefined || arr.length == 0) {
            return 0
          }
          return arr.reduce(function (p, v) {
            return ( p > v ? p : v );
          });
        };
        average = total / grades.length;
        failed = failedCounter;
        passed = passedCounter;
        best = arrayMax(grades)
      });
    const stats2 = {
      totalGroups: totalGroups,
      totalUsers: totalUsers,
      globalStats: {
        grades: {
          failed: failed,
          passed: passed,
        },
        bestGrade: best,
        averageGrade: average,
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
    res.send(stats2);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

module.exports = router;
