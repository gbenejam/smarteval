const express = require("express");
const Exam = require("../models/exam");
const auth = require("../middleware/auth");
const router = new express.Router();

//Gets the admin dashboard
router.get("/admin/dashboard", auth, async (req, res) => {
    
});
