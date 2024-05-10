const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    place:{type:mongoose.Schema.Types.ObjectId  , required:true,ref:'Place'},
    user:{type:mongoose.Schema.Types.ObjectId  , required:true},
    checkin:{type:Date,required:true},
    checkout:{type:Date,required:true},
    name:{type:String,required:true},
    phone:{type:Number},
    price:Number,

})

module.exports = mongoose.model("Booking",bookingSchema)