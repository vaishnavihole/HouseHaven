import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
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

app.listen(PORT, () => {
    console.log(`Server started listening on ${PORT}`);
})
