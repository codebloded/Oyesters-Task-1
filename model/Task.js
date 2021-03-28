const mongoose = require('mongoose')

const taksSchema = mongoose.Schema({
    task:{
        type:String,
        require:true,
    },
},{timestamps:true});

const Task = mongoose.model('Task', taksSchema);
module.exports = Task;