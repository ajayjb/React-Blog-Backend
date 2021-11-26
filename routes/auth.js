const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');

const salt = 10;

//Register
router.post("/register", async(req,res)=>{
    const hashPass = await bcrypt.hash(req.body.password, salt);
    try{
          const newUser = new User({
              username : req.body.username,
              email : req.body.email,
              password : hashPass
          });
          const user = await newUser.save();
          res.status(200).json(user);
    } catch(err){
        res.status(500).json(err);
    }
});

//Login
router.post("/login", async(req, res)=>{
    try{
        const user = await User.findOne({username : req.body.username});
        if(!user){
            res.status(400).json("User not found");
        }
        const validate = await bcrypt.compare(req.body.password, user.password);
        if(!validate){
            res.status(400).json("Password not matching");
        }

        const {password, ...others} = user._doc;

        res.status(200).json(others);
    }
    catch(err){
        console.log(err);
    }
})

module.exports = router;


