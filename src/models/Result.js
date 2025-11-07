import mongoose from "mongoose";
import { includedResultFields } from "../config/mongoConfig.js";

const resultSchema = new mongoose.Schema(
    {
        quiz: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "quizzes"
        },
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
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
    {
        statics: {
            findNumResults: async function(quizId){
                return await this.find({ quiz: quizId })
                    .select(includedResultFields)
                    .sort({ score: -1 })
                    .sort({ time: 1 });
            }
        }
    }
)

const Result = mongoose.model('results', resultSchema);

export default Result;