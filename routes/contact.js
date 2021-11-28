const router = require("express").Router();
const Contact = require("../models/Contact");


// POST A CONTACT
router.post("/", async(req,res)=>{
  const hosaCon = {
      name : req.body.name,
      email : req.body.email,
      message : req.body.message
  }
   const newContact = new Contact(hosaCon);
 try{
      const contacts = await newContact.save();
      res.status(200).json(contacts);
 }catch(e){
     res.status(501).json(e);
 }
});

module.exports = router;