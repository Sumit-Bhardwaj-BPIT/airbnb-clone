const mongoose = require('mongoose');
require("dotenv").config();

const toSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50, // Corrected from maxLength
        default: "John",
    },
    password: {
        type: String, // Corrected from password
        required: true,
        maxlength: 200, // Corrected from maxLength
        default: "John",
    },
    email: {
        type: String, // Corrected from email
        required: true,
        unique:true,
    }
});

module.exports = mongoose.model("Rg", toSchema);
// module.exports=mongoose.model("Place",PlaceSchema);
