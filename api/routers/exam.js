const express = require("express");
const Exam = require("../models/exam");
const Group = require("../models/group");

const auth = require("../middleware/auth");

const router = new express.Router();

//Create exam
router.post("/api/exams/admin", auth, async (req, res) => {
  try {
    const exams = await Exam.create({
      ...req.body,
      creator: req.user._id,
    });
    res.send(exams);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get all exams
router.get("/api/exams/admin", auth, async (req, res) => {
  try {
    const exams = await Exam.find({ creator: req.user._id });
    if (!exams) {
      return res.status(404).send("Exams not found for this user.");
    }
    res.send(exams);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get all exams
router.get("/api/exams/user", auth, async (req, res) => {
  try {
    const groups = await Group.find({ users: req.user }).then(async (groups) => {
      return await Exam.find({groups: {$in : groups}})
    }).then((result) => res.send(result));
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get a specific exam
router.get("/api/exams/admin/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const exam = await Exam.findById(_id);
    if (!exam) {
      return res.status(404).send("Exam {} not found.", _id);
    }
    res.send(exam);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get a specific exam
router.get("/api/exams/user/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const exam = await Exam.findById(_id);
    if (!exam) {
      return res.status(404).send("Exam {} not found.", _id);
    }
    res.send(exam);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Updating an exam
router.patch("/api/exams/admin/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const exam = await Exam.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!exam) {
      return res.status(404).send("Exam {} couldn't be updated", _id);
    }
    res.send(exam);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Remove exam
router.delete("/api/exams/admin/:id", auth, async (req, res) => {
  try {
    const user = req.user;
    const exam = await Exam.findByIdAndDelete(req.params.id)
      .then(async () => {
        const exams = await Exam.find({ creator: user._id });
        res.send(exams);
      })
      .catch((e) => console.log(e));
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
