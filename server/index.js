import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import  Room  from './models/Room.js'

import User from './models/User.js';
dotenv.config();

const app = express();
app.use(express.json())

const PORT = process.env.PORT || 5000
async function connectDB() {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL)
    if (connection) {
        console.log('connected to mongoDB');
    }
}
connectDB();

app.post ('/signup', async (req, res) => {
    const {fullName, email, mobile, password} = req.body
    const user = new User({
        fullName: fullName,
        email: email,
        mobile: mobile,
        password: password
    })
    const savedUser = await user.save()
    res.json({
        success: true,
        data: savedUser,
        'message': 'signup successful'
    })
})

app.post("/login", async(req, res) =>{
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })
  
    if(user) {
      res.send({
      success: true,
      message: "User logged in successfully",
      user: user
      })
    }
    else{
      res.send({
        success: false,
        message: "user name or password is incorrect"
      })
    }
  });

  app.delete('/user/:email', async(req, res) =>{
    const { email } = req.params;
    const deletedUser = await User.findOne({
     email: email,
})
res.json({
    success: true,
    data: deletedUser,
    message: 'user deleted successfully'
})
});

app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const { fullName, email, mobile, password } = req.body;

  await User.updateOne(
      {
          _id: id,
      },
      {
          $set: {
              fullName,
              email,
              mobile,
              password
          },
      })
    });


    app.post('/room', async  (req, res) => {
      const {roomNo, roomType, BHK, city, price, imgUrl } = req.body;

      const room = new Room({
        roomNo,
        roomType,
        BHK,
        city,
        price,
        imgUrl
      })
    

    const savedRoom = await room.save();
    res.json({
      success: true,
      data: savedRoom,
      message: 'create room  successfully'
  })
})


  

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
})


