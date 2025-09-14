import mongoose from "mongoose";

export const userPopulateExcludes = '-_id -password -refreshToken -__v';
export const notePopulateExcludes = '';
export const quizPopulateExcludes = '';

export async function dbConnect()
{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongodb');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}