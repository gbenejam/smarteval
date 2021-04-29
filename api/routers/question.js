const express = require('express')
const Question = require('../models/question')
const auth = require("../middleware/auth");

const router = new express.Router()


//Create question
router.post('/questions', auth, async (req,res) => {
    try {
        const question = await Question.create(req.body)
        res.send(question)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Gets all questions for a topic
router.get('/questions/:topic', auth, async (req,res) => {
    const topic = req.params.topic
    try {
        const questions = await Question.find({topic: topic})
        if(!questions) {
            return res.status(404).send("Couldn't find any questions for that topic.")
        }
        res.send(questions)
    } catch (e) {
        res.status(500).send(e)
    }
})

//Gets a specific question
router.get('/questions/:id', auth, async (req,res) => {
    const _id = req.params.id
    try {
        const question = await Question.findById(_id)
        if(!question) {
            return res.status(404).send("Couldn't find the question for this id {}", _id)
        }
        res.send(question)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router