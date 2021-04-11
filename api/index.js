const express = require('express')
const mongoose = require('./db/mongoose')
const User = require('./models/user')
const Exam = require('./models/exam')
const userRouter = require('./routers/user')
const examRouter = require('./routers/exam')

const app = express()
const port = process.env.PORT || 3030

app.use(express.json())
app.use(userRouter)
app.use(examRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})