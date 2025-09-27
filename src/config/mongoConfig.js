import mongoose from "mongoose";

export const excludeVersion = '-__v ';
export const excludedUserFields = excludeVersion + '-_id -password -refreshToken -__v';
export const excludedNoteFields = excludeVersion + '';
export const excludedQuizFields = excludeVersion + '';
export const excludedResultFields = excludeVersion + '';
export const excludedTagFields = excludeVersion + '-creator';

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