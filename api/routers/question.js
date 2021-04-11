const express = require('express')
const Question = require('../models/question')
const router = new express.Router()

router.post('/questions', async (req,res) => {
    try {
        const question = await Question.create(req.body)
        res.send(question)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router