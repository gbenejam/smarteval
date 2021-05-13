const express = require('express')
const mongoose = require('./db/mongoose')
var cors = require('cors');

const User = require('./models/user')
const Exam = require('./models/exam')
const Question = require('./models/question')
const Group = require('./models/group')
const Topic = require('./models/topic')

const userRouter = require('./routers/user')
const examRouter = require('./routers/exam')
const questionRouter = require('./routers/question')
const groupRouter = require('./routers/group')
const topicRouter = require('./routers/topic')


const app = express()
const port = process.env.PORT || 3030

app.use(cors());

app.use(express.json())
app.use(userRouter)
app.use(examRouter)
app.use(questionRouter)
app.use(groupRouter)
app.use(topicRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})