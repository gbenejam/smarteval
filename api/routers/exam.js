const express = require('express')
const Exam = require('../models/exam')
const router = new express.Router()

router.post('/admin/exams', async (req,res) => {
    try { 
        const exams = await Exam.create(req.body)
        res.send(exams)
    } catch (e) {
        res.status(500).send(e)
    }
})

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

module.exports = router