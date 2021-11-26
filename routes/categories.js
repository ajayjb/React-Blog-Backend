const router = require("express").Router();
const Category = require("../models/Category");


router.post("/", async(req, res)=>{
  try{
    const cat = new Category(req.body);
    const hosaCat = await cat.save();
    res.status(200).json(hosaCat);
  }catch(err){
    res.status(500).json(err);
  }
})


router.get("/", async(req, res)=>{
    try{
      const cats = await Category.find();
      res.status(200).json(cats);
    }catch(err){
      res.status(500).json(err);
    }
  })


  module.exports = router;