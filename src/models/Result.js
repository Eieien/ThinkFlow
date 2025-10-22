import mongoose from "mongoose";

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
            type: Date,
            required: true
        }
    },
    { 
        timestamps: true,
        statics: {
            findAllByQuizId: async function(quizId){
                return await this.find({ quiz: quizId });
            }
        }
    }
)

const Result = mongoose.model('results', resultSchema);

export default Result;