
const mongoose = require('mongoose');
require("dotenv").config();

const PlaceSchema=new  mongoose.Schema({
    owner:{type:mongoose.Schema.Types.ObjectId, ref:'Rg'},
    title:String,
    address:String,
    addedPhotos:[String],
    description:String,
    perks:[String],
    extraInfo:String,
    checkin:Number,
    checkout:Number,
    maxGuests:Number,
    price:Number,

})


module.exports=mongoose.model("Place",PlaceSchema);