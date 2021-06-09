const express = require('express')
const Topic = require('../models/topic')
const auth = require("../middleware/auth");

const router = new express.Router()


//Create topic
router.post('/api/topics', auth, async (req,res) => {
    try {
        const user = req.user
        const topic = await Topic.create(req.body).then(async () => {
            const topics = await Topic.find({ creator: user._id })
            res.send(topics)
        }).catch((e) => console.log(e))
    } catch(e) {
        res.status(500).send(e)
    }
})

//Get topics by creator
router.get('/api/topics', auth, async (req,res) => {
    try {
        const user = req.user
        const topic = await Topic.find({ creator: user._id })
        res.send(topic)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Remove topic
router.delete('/api/topics/:id', auth, async (req,res) => {
    try {
        const user = req.user
        const topic = await Topic.findByIdAndDelete(req.params.id).then(async () => {
            const topics = await Topic.find({ creator: user._id })
            res.send(topics)
        }).catch((e) => console.log(e))
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router