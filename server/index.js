import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Room from './models/Room.js';
import RoomBooking from './models/RoomBooking.js';

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

// user api
app.post('/signup', async (req, res) => {
  const { fullName, email, mobile, password } = req.body
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

app.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })

  if (user) {
    res.send({
      success: true,
      message: "User logged in successfully",
      user: user
    })
  }
  else {
    res.send({
      success: false,
      message: "user name or password is incorrect"
    })
  }
});

app.delete('/user/:email', async (req, res) => {
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

// room api 
app.post('/room', async (req, res) => {
  const { roomNo, roomType, BHK, city, price, imgUrl } = req.body;

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
});

app.get('/room/:id', async (req, res) => {
  const { id } = req.params;

  const room = await Room.findById(id);
  if (!room) {
    return res.json({
      success: false,
      messge: 'Room not found'
    })
  }

  res.json({ 
    success: true, 
    data: room,
    message: 'Room fetched successfully'
  });

})

app.get('/rooms', async (req, res) => {
  
  const rooms = await Room.find();

  res.json({ 
    success: true, 
    data: rooms,
    message: 'Room fetched successfully'
  });
})

app.put('/room/:id',async (req, res) => {
  const { id } = req.params;
  const { roomNo, roomType, BHK, city, price, imgUrl } = req.body;

  await Room.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        roomNo,
        roomType,
        BHK,
        city,
        price,
        imgUrl,
      },
    }
  );


  const updatedRoom = await Room.findById(id);

  res.json({
    success: true,
    data: updatedRoom,
    message: "Room updated Successfully"

  })
})

app.delete('/room/:id', async (req, res) => {
    const { id } = req.params;
    const room = await Room.deleteOne({
      _id: id
    });
    res.json({
         success: true,
         message: "Room deleted Successfully"
    })

  })


  // room booking api
  app.post('/roomBooking', async (req, res) => {
    const { userId, roomId, bookingStartDate, bookingEndDate  } = req.body;
  
    const roomBooking = new RoomBooking({
      userId,
      roomId,
      bookingStartDate,
      bookingEndDate,
    })
  

    const savedRoomBooking = await roomBooking.save();
    res.json({
      success: true,
      data: savedRoomBooking,
      message: 'create room booking  successfully'
    })
  });

  app.get('/roomBooking/:id', async (req, res) => {
    const { id } = req.params;
  
    const roomBooking = await RoomBooking .findById(id);
    if (!roomBooking) {
      return res.json({
        success: false,
        messge: 'RoomBooking not found'
      })
    }
  
    res.json({ 
      success: true, 
      data: roomBooking,
      message: 'RoomBooking fetched successfully'
    });
  
  })

  app.get('/roomBookings', async (req, res) => {
  
    const roomBookings = await RoomBooking.find();
  
    res.json({ 
      success: true, 
      data: roomBookings,
      message: 'Room Bookings fetched successfully'
    });
  })

  app.put('/roomBooking/:id',async (req, res) => {
    const { id } = req.params;
    const { userId, roomId, bookingStartDate, bookingEndDate } = req.body;
  
    await RoomBooking.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          userId,
          roomId,
          bookingStartDate,
          bookingEndDate
        },
      }
    );
  
  
    const updatedRoomBooking = await RoomBooking.findById(id);
  
    res.json({
      success: true,
      data: updatedRoomBooking,
      message: "RoomBooking updated Successfully"
  
    })
  })
  

  app.delete('/roomBooking/:id', async (req, res) => {
    const { id } = req.params;
    const roomBooking = await RoomBooking.deleteOne({
      _id: id
    });
    res.json({
         success: true,
         message: "RoomBooking deleted Successfully"
    })

  })
   
  





app.listen(PORT, () => {
  console.log(`Server started listening on ${PORT}`);
})


