const express = require('express')
const mongoose = require('mongoose');
const HOST = 'localhost';
const path = require('path')
const PORT = "5000";
const auth = require('./routes/auth');
const task = require('./routes/tasks');
const  bodyParser = require('body-parser')

//Initailizing the app 
const app = express();
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const MONGO_URI = 'mongodb://localhost:27017/oyester';


//Connceting the database with the server i.e 'mongodb'
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URI , ({useUnifiedTopology:true ,useNewUrlParser:true, useFindAndModify:false }),()=>{
    console.log("connected to mongodb");
})
app.get('/', (req, res)=>{
    req.header("Content-Type", "application/json")
    res.sendFile(path.join(__dirname + '/register.html'));
})

app.use(auth);
app.use(task);


app.listen(PORT, ()=>{
    console.log(`The server is running at http://${HOST}:${PORT}`)
})
