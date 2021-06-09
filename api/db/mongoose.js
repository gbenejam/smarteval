const mongoose = require('mongoose')
const dbHostName = process.env.DB_HOST || "127.0.0.1"
const dbPort = process.env.DB_PORT || "27018"

let connectURL;
if (process.env.DEV) {
  connectURL = `mongodb://${dbHostName}:${dbPort}/smarteval`;
} else {
  connectURL = 'mongodb+srv://dbadmin:admin@smarteval.ufve5.mongodb.net/smarteval'
    + '?retryWrites=true&w=majority';
}

console.log('connectURL = ' + connectURL);

mongoose.set('useUnifiedTopology', true);

mongoose.connect(connectURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
  console.log("Connected to Mongo database!");
})
.catch(err => {
  console.error("Mongoose connection error:", err.stack);
});
