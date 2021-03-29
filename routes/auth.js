const express = require('express')
const router = express.Router();
const JWT = require('jsonwebtoken')
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const path = require('path')
require('dotenv').config()



// router.get('/', (req, res)=>{
//     res.send("Login page")
// })

// =========================REGISTERATION-ROUTE===========================================

router.get('/login', (req, res)=>{
    req.header("Content-Type", "application/json")
    res.sendFile(path.join(__dirname + '/login.html'));
})

router.post('/register', async(req, res)=>{
    req.header("Content-Type", "application/json");
    const {name ,email, password } = req.body;
    if(!name || !email || !password){
        return res.status(404).json({error:'please fill all the fields'});
    }
    try {
        const savedUser = await User.findOne({email});
        if(savedUser){
            return res.json({message:"user already registered"})
        }
        const hashedPassword = await bcrypt.hash(password , 12);
        const user = new User({
            name,
            email,
            password:hashedPassword,
        })
        
        user.save().then(user=>{
            res.redirect('/login')
                res.status(200).json({message:'Sucessfully saved'});
            }).catch(err=>{
                res.json({error:err});
           
            })

    } catch (err) {
            res.json({error:"Something went wrong"});
    }
})
// =================================================================================================

router.post('/login', async (req, res)=>{
    req.header("Content-Type" , "application/json");
    const {email, password} = req.body
    if(!email || !password){
        return res.status(404).json({error:"please fill all the fields"});
    }
    try {
        const savedUser = await User.findOne({email})
        if(!savedUser){
            return res.json({message:"Invaild email or password"});
        }
        
        const matchedPassword = await bcrypt.compare(password , savedUser.password)
        if(matchedPassword){
            //Initailizing the JSON_WEB_TOKEN
            const token = JWT.sign({_id:savedUser._id},process.env.JWT_SECRET)
            const {_id , email , password} = savedUser;
            res.json({token , user:{_id , email , password}});
        }
        else{
            res.json({error:"Email or password is wrong"})
        }
    } catch (error) {
        res.json({error:error})
        console.log(error);
    }
})

module.exports =router;