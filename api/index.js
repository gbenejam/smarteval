const express = require('express')
const mongoose = require('./db/mongoose')
const cors = require('cors');
const path = require('path');

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


const app = express()
const port = process.env.PORT || 3030

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname + '/build')));

app.use(userRouter);
app.use(examRouter);
app.use(solvedExamRouter);
app.use(questionRouter);
app.use(groupRouter);
app.use(topicRouter);
app.use(dashboardRouter);
app.use(statsRouter);
app.use(appRouter);

app.listen(port, () => {
    console.log('Server is up on port ' + port)
});