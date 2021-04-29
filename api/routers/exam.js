const express = require("express");
const Exam = require("../models/exam");
const auth = require("../middleware/auth");

const router = new express.Router();

//Create exam
router.post("/admin/exams", auth, async (req, res) => {
  try {
    const exams = await Exam.create(req.body);
    res.send(exams);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get all exams
router.get("/admin/exams", auth, async (req, res) => {
  try {
    console.log(auth.user);
    const exams = await Exam.find({ userId: req.user._id });
    if (!exams) {
      return res.status(404).send("Exams not found for this user.");
    }
    res.send(exams);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Get a specific exam
router.get("/admin/exams/:id", auth, async (req, res) => {
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
router.patch("/admin/exams/:id", auth, async (req, res) => {
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

//Deleting an exam
router.delete("/admin/exams/:id", auth, async (req, res) => {
  const _id = req.params.id;
  try {
    const exam = await Exam.findByIdAndDelete(_id);
    if (!exam) {
      return res.status(404).send("Exam {} couldn't be deleted", _id);
    }
    res.send(exam);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
