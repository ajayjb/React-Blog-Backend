const express = require("express");
const dotenv = require('dotenv').config();
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const contactRouter = require("./routes/contact");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
// const Contact = require("./models/Contact");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname,"/images")));

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
})
.then(console.log("Connected to MongoDB"))
.catch((err)=>{console.log(err)});

const storage = multer.diskStorage({
    destination:(req, file, cb)=>{
        cb(null, "images");
    }, filename:(req, file, cb)=>{
        cb(null, req.body.name);
    }
});

const upload = multer({storage:storage});
app.post("/api/upload", upload.single("file"), (req,res)=>{
    res.status(200).json("file uploaded");
})

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts",  postRouter);
app.use("/api/category", categoryRouter);
app.use("/api/contacts", contactRouter);

// app.post("/api/contact/", async(req, res)=>{
//     const contactNew = new Contact(req.body);
//     try{
//         const hosaContact = await contactNew.save();
//         res.status(200).json(hosaContact);
//     }catch(e){
//         res.status(501).json(e);
//     }
// });

app.listen("5000",()=>{
    console.log("Server is running on port 5000")
});

