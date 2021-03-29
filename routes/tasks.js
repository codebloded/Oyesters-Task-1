const { json } = require('body-parser');
const express = require('express');
const Task = require('../model/Task');
const path = require('path')


const router = express.Router();

router.get('/task', async (req, res)=>{
    
    const tasks = await Task.find({});
   
    try {
        res.setHeader('Content-Type','text/html')
        res.sendFile(path.join(__dirname + '/task.html'));

    } catch (error) {
        res.json({err:error})
        console.log(error)
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
            res.redirect('/show')
            res.json({message:"Task Added !"})
        })
    } catch (error) {
        console.log(error)
        res.json({error:error});
    }
        
});

router.get('/show' , async (req, res)=>{
    const data = await Task.find({} , (err, tasks)=>{
        if(!err){
            tasks[tasks._id] = tasks;
        }
    });
    res.json(data)
  
})



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

router.delete('/task/:id',async (req , res)=>{
        await Task.findByIdAndDelete(req.params.id,(err)=>{
            if(err){
                console.log(err)
                return res.status(400).json({error:"Someting went wrong while deleting the task"})
            }
         
            res.status(200).json({message:"task Deleted Sucessfully"});
              
          
        });

    
})

module.exports = router;