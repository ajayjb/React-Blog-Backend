const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require('bcrypt');

//Update User
router.put("/update/:id", async(req,res)=>{
    if(req.body.userID === req.params.id){
        if (req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.body.userID, {
                $set : req.body
            }, 
            {new : true});

            res.status(200).json(updatedUser);
        } catch(err){
             console.log(err);
        }
    }else{
        res.status(401).json("You can only update your account");
    }
});
     
//Delete User
router.delete("/delete/:id", async(req,res)=>{
    if(req.body.userID === req.params.id){
        try{
            const user = User.findById(req.body.userID);
            try{
                await Post.deleteMany({username : user.username});
                await User.findByIdAndDelete(req.body.userID);
                res.status(200).json("Deleted sucessfully");
            } catch(err){
                 res.status(500).json(err)
            }
        }
        catch(err){
            res.status(404).json("User not found");
       }
    }
    else{
        res.status(401).json("You can only delete your account");
    }
});

// Get User
router.get("/bloguser/:id", async(req,res)=>{
        try{
            const user = await User.findById(req.params.id);
            const {password, ...other} = user._doc;
            res.status(200).json(other);
        }
        catch(err){
            res.status(500).json(err);
        }
});

module.exports = router;
