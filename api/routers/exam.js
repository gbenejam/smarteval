const express = require('express')
const Exam = require('../models/exam')
const router = new express.Router()

router.get('/admin/exams', async (req,res) => {
    try { 
        const exams = await Exam.find({})
        if(!exams) {
            return res.status(404).send('Exams not found for this user.')
        }
        res.send(exams)
    } catch (e) {
        res.status(500).send(e)
    }
})