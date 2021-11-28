const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
    name : {
        type : String,
        required : false
    },
    email : {
        type : String,
        required : false
    },
    message : {
        type : String,
        required : false
    }
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;