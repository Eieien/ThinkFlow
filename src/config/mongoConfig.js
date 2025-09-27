import mongoose from "mongoose";

export const excludedUserFields = '-_id -password -refreshToken -__v';
export const excludedNoteFields = '-_id -__v';
export const excludedQuizFields = '-__v';

export async function connectToMongoDB()
{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to mongodb');
    } catch (err) {
        console.log(err.message);
        process.exit(1);
    }
}