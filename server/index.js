import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
})
