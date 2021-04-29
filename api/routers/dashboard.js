const express = require("express");
const Exam = require("../models/exam");
const auth = require("../middleware/auth");
const router = new express.Router();

//Gets the admin dashboard
router.get("/admin/dashboard", auth, async (req, res) => {
  //To-do: Query 5 latest exams, 5 next exams, dashboard data
});
