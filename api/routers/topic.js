const express = require('express')
const Topic = require('../models/topic')
const auth = require("../middleware/auth");

const router = new express.Router()


//Create topic
router.post('/topics', auth, async (req,res) => {
    try {
        const topic = await Topic.create(req.body)
        res.send(topic)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Get topics by creator
router.get('/topics', auth, async (req,res) => {
    try {
        const user = req.user
        const topic = await Topic.find({ creator: user._id })
        res.send(topic)
    } catch(e) {
        res.status(500).send(e)
    }
})

module.exports = router