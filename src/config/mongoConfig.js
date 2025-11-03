import mongoose from "mongoose";

export const excludeV = '-__v ';
// export const excludedNoteFields = excludeV + '';
// export const excludedQuizFields = excludeV + '';
// export const excludedResultFields = excludeV + '';

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