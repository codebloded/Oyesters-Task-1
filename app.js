const express = require('express')
const mongoose = require('mongoose');
const HOST = 'localhost';
const PORT = "5000";
const auth = require('./routes/auth');
const task = require('./routes/tasks');

//Initailizing the app 
const app = express();
app.use(express.json())
const MONGO_URI = 'mongodb://localhost:27017/oyester';


//Connceting the database with the server i.e 'mongodb'
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI , ({useUnifiedTopology:true ,useNewUrlParser:true, useFindAndModify:false }),()=>{
    console.log("connected to mongodb");
})


app.use(auth);
app.use(task);


app.listen(PORT, ()=>{
    console.log(`The server is running at http://${HOST}:${PORT}`)
})
