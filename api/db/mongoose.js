const mongoose = require('mongoose')
const dbHostName = process.env.DB_HOST || "127.0.0.1"
const dbPort = process.env.DB_PORT || "27018"

mongoose.set('useUnifiedTopology', true);

mongoose.connect(`mongodb://${dbHostName}:${dbPort}/smarteval`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})