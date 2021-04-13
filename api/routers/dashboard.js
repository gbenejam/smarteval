const express = require('express')
const Exam = require('../models/exam')
const router = new express.Router()


//Gets the admin dashboard
router.get('/admin/dashboard', async (req,res) => {
    //To-do: Query 5 latest exams, 5 next exams, dashboard data
})