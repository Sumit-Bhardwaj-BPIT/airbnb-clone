const express = require('express');
const app = express();
const cors = require('cors');
const Rg = require('./schema/theSchema');
const imageDownloader=require('image-downloader');
const Place = require('./schema/Place');
const Booking=require('./schema/Booking');
const bcrypt=require('bcryptjs')
const dbConnect = require('./config/database');
const { JsonWebTokenError } = require('jsonwebtoken');
require("dotenv").config();
const jwt=require('jsonwebtoken');
const salt=bcrypt.genSaltSync(10);
const secret='sumitbhardwaj';
const cookieParser=require('cookie-parser');
const multer=require('multer');
const mime=require('mime-types');
const {S3Client, PutObjectCommand}=require('@aws-sdk/client-s3');
const fs=require('fs');
const { resolve } = require('path');
const { rejects } = require('assert');
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000',
}));

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

const bucket='airbnb-sumit-bucket';

app.get('/test', (req, res) => {
    res.send('ok ok ok');
});

async function uploadToS3(path,originalFileName,mimetype){
    const client=new S3Client({
        region:'ap-south-1',
        credentials:{
            accessKeyId:process.env.S3_AACCESS_KEY,
            secretAccessKey:process.env.S3_ASECRET_ACCESS_KEY,
        },
    });
    const parts=originalFileName.split('.');
    const ext=parts[parts.length-1];
    const newFilename=Date.now() + '.' + ext;
    const data = await client.send(new PutObjectCommand({
        Bucket:bucket,
        Body:fs.readFileSync(path),
        Key:newFilename,
        ContentType:mimetype,
        ACL:'public-read',
    }));
    // console.log({path,originalFileName,mimetype,ext,newFilename});
    // console.log({data});

    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
}

// Wrap the registration route in an async function
app.post('/register', async (req, res) => {
    dbConnect();
    const { name, email, password } = req.body;
    
    try {
        
        const output = await Rg.create({ name, email, password:bcrypt.hashSync(password,salt)});
        res.json(output);
    } catch (error) {
        // alert('failed');
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

app.post('/login',async (req,res)=>{
    
    
    try{
        dbConnect();
        const {email,password} = req.body;
        const output=await Rg.findOne({email:email});
        if(output){
            const passOk = bcrypt.compareSync(password,output.password);
            if(passOk){
                jwt.sign({email:output.email,
                    id:output._id,
                    name:output.name,
                },secret,{},(err,token)=>{
                    if(err) throw err;
                    res.cookie('token',token).json(output);
                })
                // res.status(201).json('login success');
            }
            else{
                res.status(452).json({
                    message:'login fail',
                    value:passOk,
                });
            }
        }
        else{
            alert('you have not Registered. Register to Login');
        }
    }
    catch(error){
        res.status(401).send('failed to login register instead');
    }
})

app.get('/profile', async (req, res) => {
    dbConnect();
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, async (err, userData) => {
            if (err) {
                throw err;
            }
            const { name, email, _id } = await Rg.findById(userData.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
    // You might want to remove this line because it's unreachable
    // res.json(`user info`);
});

app.post('/logout',(req,res)=>{
    res.cookie('token','').json(true);
})

app.post('/upload-by-link',async (req,res)=>{
    dbConnect();
    const {link}=req.body;
    const newName='photo'+ Date.now()+'.jpg';
    await imageDownloader.image({
        url: link, // This is where the URL should be provided
        dest:'/tmp/'+newName ,
    });
    const url = await uploadToS3('/tmp/'+newName,newName,mime.lookup('/tmp/'+newName));
    
    res.json(url);


})
const photosMiddleware=multer({dest:'/tmp'});
app.post('/upload' ,photosMiddleware.array('photos',100), async (req,res)=>{
    dbConnect();
    const uploadedFiles = [];
    for(let i=0;i<req.files.length;i++){
        // const fileInfo = req.files[i];
        const {path,originalname,mimetype}=req.files[i];
        // const parts=originalname.split('.');
        // const ext = parts[parts.length - 1];
        // const newPath=path + '.' + ext;
        // fs.renameSync(path,newPath);
        // uploadedFiles.push(newPath);
        // await uploadToS3(path,originalname,mimetype);
        const url=await uploadToS3(path,originalname,mimetype);
        uploadedFiles.push(url);

    }
    res.json(uploadedFiles);
})

app.post('/places',(req,res)=>{
    dbConnect();
    const {token} = req.cookies;
    const {title,address,addedPhotos,description,perks,extraInfo,checkin,checkout,maxGuests,price} = req.body;
    jwt.verify(token, secret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const placeDoc = await Place.create({
            owner:userData.id,
            title,address,addedPhotos,description,perks,extraInfo,checkin,checkout,maxGuests,price,
        });
        res.json(placeDoc);
         
    });
    
})


app.get('/places',async (req,res)=>{
    dbConnect();
    const {token}=req.cookies;
    jwt.verify(token, secret, {}, async (err, userData) => {
        if (err) {
            throw err;
        }
        const {id} = userData;
        res.json(await Place.find({owner:id}));
    })
})

app.get('/places/:id',async (req,res)=>{
    dbConnect();
    const {id}=req.params;
    res.json(await Place.findById(id));
})

app.get('/place/:id',async (req,res)=>{
    dbConnect();
    const {id}=req.params;
    res.json(await Place.findById(id));
})

app.put('/places', async (req,res) => {
    dbConnect();
    // mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    const {
      id, title,address,addedPhotos,description,
      perks,extraInfo,checkin,checkout,maxGuests,price,
    } = req.body;
    jwt.verify(token, secret, {}, async (err, userData) => {
      if (err) throw err;
      const placeDoc = await Place.findById(id);
      if (userData.id === placeDoc.owner.toString()) {
        placeDoc.set({
          title,address,addedPhotos,description,
          perks,extraInfo,checkin,checkout,maxGuests,price,
        });
        await placeDoc.save();
        res.json('ok');
      }
    });
  });

  app.get('/home',async (req,res)=>{
    dbConnect();
    res.json(await Place.find());
  })


  app.post('/bookings',async  (req,res)=>{
    dbConnect();
    const userData = await getUserFromReq(req);
    const {place,checkin,checkout,numberOfGuests,name,phone,price} = req.body;

    const doc = await Booking.create({
        checkin,checkout,name,numberOfGuests,phone,place,price,user:userData.id,
     })

    res.json(doc);
    //.then((err,doc)=>{
    //     if(err){
    //         throw err;
    //     }
    //     res.json(doc);
    // })

  })

  function getUserFromReq(req){
    return new Promise((resolve,reject)=>{
        jwt.verify(req.cookies.token,secret,{},async (err,userData)=>{
            if(err) throw err;
            resolve(userData);
        });
    });
  }

  app.get('/bookings',async (req,res)=>{
    dbConnect();
    const userData = await getUserFromReq(req);
    
    res.json(await Booking.find({user:userData.id}).populate('place'));
  })

//   app.get('/bookings', async (req, res) => {
//     try {
//       const userData = await getUserFromReq(req);
//       const bookings = await Booking.find({ user: userData.id })
//         .populate('place')
//         .exec();
  
//       res.status(202).json(bookings);
//     } catch (error) {
//       // Handle any potential errors, e.g., send an error response or log the error.
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });
  

// app.get('/bookings', async (req, res) => {
//     try {
//       const userData = await getUserFromReq(req);
//       const bookings = await Booking.find({ user: userData.id }).populate('place');
//       res.json(bookings);
//     } catch (error) {
//       // Handle any potential errors, e.g., send an error response or log the error.
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });


const PORT = process.env.PORT || 4500;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});