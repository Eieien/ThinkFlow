import mongoose from "mongoose";

async function dbConnect()
{
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to mongodb');
}

export default dbConnect;