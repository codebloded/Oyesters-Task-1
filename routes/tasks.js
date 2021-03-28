const express = require('express');
const Task = require('../model/Task');


const router = express.Router();

router.get('/task',(req, res)=>{
    res.json("GET ON TASK")
});

router.post('/task', (req, res)=>{
    req.header('Content-Type , "application/json');
    const {task} = req.body;
    if(!task){
        return res.status(404).json({error:"Insert the Task"});
    }
    try {
        const Tasks = new Task({
            task
        });
        Tasks.save().then(task=>{
            res.json({message:"Task Added !"})
        })
    } catch (error) {
        console.log(error)
        res.json({error:error});
    }
        
});

module.exports = router;