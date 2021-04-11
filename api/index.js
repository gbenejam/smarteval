const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Exam = require('./models/exam')
const Question = require('./models/question')
const userRouter = require('./routers/user')
const examRouter = require('./routers/exam')
const questionRouter = require('./routers/question')

const app = express()
const port = process.env.PORT || 3030

app.use(express.json())
app.use(userRouter)
app.use(examRouter)
app.use(questionRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})