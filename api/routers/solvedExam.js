const express = require("express");
const SolvedExam = require("../models/solvedExam");
const User = require("../models/user");
const Group = require("../models/group");

const auth = require("../middleware/auth");

const router = new express.Router();


// Getting all solved exams for a given exam id (only admin)
router.get("/api/solved-exam/all/:exam/", auth, async (req, res) => {
  try {
    if (req.user && req.user.isAdmin) {
      const examId = req.params.exam;
      const solvedExams = await SolvedExam.find({examId: examId});
      res.send(solvedExams);
    } else {
      res.status(403).send('You are not authorized to get this data.');
    }
  } catch(e) {
    res.status(500).send(e);
  }
});

router.get("/api/solved-exam/submit/:exam", auth, async (req, res) => {
  try {
    if (req.user) {
      const userId = req.user._id;
      const examId = req.params.exam;
      const solvedExams = await SolvedExam.find({examId: examId, user: userId});
      let examSubmited = false;
      if (Array.isArray(solvedExams)) {
        // there are one or more exams submited
        examSubmited = !!solvedExams.length;
      } else if (typeof solvedExams === 'object') {
        // check if it has some properties or it is an empty object
        examSubmited = !!solvedExams._id;
      }
      res.send({ examSubmited: examSubmited });
    }
  } catch(e) {
    res.status(500).send(e);
  }
});

// Uploading a new exam solved
router.post("/api/solved-exam/submit", auth, async (req, res) => {
  try {
    const solvedExam = await SolvedExam.create({
      ...req.body,
      user: req.user._id,
    });
    res.send('OK');
  } catch(e) {
    res.status(500).send(e);
  }
});

// Updating a solved exam (only admin)
router.patch("/api/solved-exam/update/:exam", auth, async (req, res) => {
  try {
    const solvedExamId = req.params.exam;
    if (req.user && req.user.isAdmin) {
      const solvedExam = await SolvedExam.findByIdAndUpdate(solvedExamId, req.body, {
        new: true
      });
      res.send(solvedExam);
    } else {
      res.status(403).send('You are not authorized to get this data.');
    }
  } catch(e) {
    res.status(500).send(e);
  }
});


module.exports = router;
