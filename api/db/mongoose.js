const mongoose = require('mongoose')

mongoose.set('useUnifiedTopology', true);

mongoose.connect('mongodb://127.0.0.1:27018/smarteval', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})