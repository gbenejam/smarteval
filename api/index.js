const http = require('http')
const express = require('express')
const mongoose = require('./db/mongoose')
const cors = require('cors');

const User = require('./models/user')
const Exam = require('./models/exam')
const Question = require('./models/question')
const Group = require('./models/group')
const Topic = require('./models/topic')

const appRouter = require('./routers/appHtml')
const userRouter = require('./routers/user')
const examRouter = require('./routers/exam')
const solvedExamRouter = require('./routers/solvedExam')
const questionRouter = require('./routers/question')
const groupRouter = require('./routers/group')
const topicRouter = require('./routers/topic')
const dashboardRouter = require('./routers/dashboard')
const statsRouter = require('./routers/stats')


const appHtml = express()
const appApi = express()
const portApi = process.env.PORT || 3030

appHtml.use(cors());
appApi.use(cors());

// route requests for static files to appropriate directory
appHtml.use('/', express.static(__dirname + '/build'))
appHtml.use(appRouter);

appApi.use(express.json())
appApi.use(userRouter)
appApi.use(examRouter)
appApi.use(solvedExamRouter)
appApi.use(questionRouter)
appApi.use(groupRouter)
appApi.use(topicRouter)
appApi.use(dashboardRouter)
appApi.use(statsRouter)

http.createServer(appHtml).listen(80)

appApi.listen(portApi, () => {
    console.log('Server API is up on port ' + portApi)
})