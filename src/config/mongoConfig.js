import mongoose from "mongoose";

export const excludeV = '-__v ';
export const includeUserFields = "username email password";
export const excludedQuizFields = excludeV + '-questions';
export const includedResultFields = "-_id score time";

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