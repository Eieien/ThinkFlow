import mongoose from "mongoose";

const resultSchema = new mongoose.Schema(
    { obj: 's' },
    { timestamps: true }
)

const Result = mongoose.model('results', resultSchema);

export default Result;