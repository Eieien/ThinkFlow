import mongoose from "mongoose";
import { exit } from "process";

async function dbConnect()
{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongodb');
    } catch (err) {
        console.log(err.message);
        exit(1);
    }
}

export default dbConnect;