const express = require('express')
const Question = require('../models/question')
const auth = require("../middleware/auth");

const router = new express.Router()


//Create question
router.post('/api/questions', auth, async (req,res) => {
    try {
        const question = await Question.create({
            ...req.body,
            creator: req.user._id
        })
        res.send(question)
    } catch(e) {
        console.log(e)
        res.status(500).send(e)
    }
})

//Get questions from a certain user
router.get('/api/questions', auth, async (req,res) => {
    try {
        const user = req.user
        const question = await Question.find({ creator: user._id })
        res.send(question)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Remove question
router.delete('/api/questions/:id', auth, async (req,res) => {
  try {
    const user = req.user
    const question = await Question.findByIdAndDelete(req.params.id).then(async () => {
        const questions = await Question.find({ creator: user._id })
        res.send(questions)
    }).catch((e) => console.log(e))
  } catch(e) {
      res.status(500).send(e)
  }
})

// update a question
router.patch('/api/questions/:id', auth, async (req,res) => {
  const _id = req.params.id;
  try {
    const question = await Question.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!question) {
      return res.status(404).send("Question {} couldn't be updated", _id);
    }
    res.send(question);
  } catch (e) {
    res.status(500).send(e);
  }
})

//Gets a specific question
router.get('/api/questions/:id', auth, async (req,res) => {
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