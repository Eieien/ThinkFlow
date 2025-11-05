import mongoose from "mongoose";
import { excludeV } from "../config/mongoConfig.js";

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
            type: String,
            required: true
        }
    },
    { 
        timestamps: true,
        statics: {
            findByQuizId: async function(quizId){
                return await this.find({ quiz: quizId }, excludeV)
                    .sort({ score: -1 })
                    .sort({ time: 1 })
                    .populate('user', excludeV);
            }
        }
    }
)

const Result = mongoose.model('results', resultSchema);

export default Result;