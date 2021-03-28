const express = require('express');
const Task = require('../model/Task');


const router = express.Router();

router.get('/task', async (req, res)=>{
    const tasks = await Task.find({});

    try {
        res.json(tasks)

    } catch (error) {
        res.json({err:error})
    }
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

router.put('/task/:id',async (req , res)=>{
    req.header("Content-Type" ,"application/json");
  
        await Task.findByIdAndUpdate(req.body.id, req.body , {new:true}, (err)=>{
            if(err){
                console.log(err)
                return res.status(400).json({error:"Someting went wrong while updating the task"})
            }
         
            res.status(200).json({message:"task upadated Sucessfully"});
              
          
        });

    
})

module.exports = router;