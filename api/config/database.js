const mongoose=require('mongoose');
require("dotenv").config();

const dbConnect = ()=>{
    mongoose.connect(process.env.URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true, // Corrected option name to useUnifiedTopology
    })
    .then(()=>{console.log('succesfully connected to database')})
    .catch((err) => {
        console.log(`Error is ${err}`);
        process.exit(1);
    });
}


module.exports=dbConnect;