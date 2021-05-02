const express = require('express')
const Group = require('../models/group')
const auth = require("../middleware/auth");

const router = new express.Router()


//Create group
router.post('/groups', auth, async (req,res) => {
    try {
        const group = await Group.create(req.body)
        res.send(group)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Get groups by creator
router.get('/groups', auth, async (req,res) => {
    try {
        const user = req.user
        const group = await Group.find({ creator: user._id })
        res.send(group)
    } catch(e) {
        res.status(500).send(e)
    }
})

//Gets a specific group
router.get('/groups/:id', auth, async (req,res) => {
    const _id = req.params.id
    try {
        const group = await Group.findById(_id)
        if(!group) {
            return res.status(404).send("Couldn't find the group for this id {}", _id)
        }
        res.send(group)
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router