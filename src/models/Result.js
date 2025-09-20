import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    {
        quiz: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "quizzes"
        },
        score: {
            type: Number,
            required: true
        },
        time: {
            type: Number,
            required: true
        }
    },
    { timestamps: true }
)

const Result = mongoose.model('results', resultSchema);

export default Result;