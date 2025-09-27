import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        note: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "notes",
            required: true
        },
        quizTitle: { 
            type: String,
            required: true
        },
        description: { 
            type: String, 
            required: true
        },
        questions: [
            {
                question: { type: String, required: true },
                options: { 
                    a: { type: String, required: true },
                    b: { type: String, required: true },
                    c: { type: String, required: true },
                    d: { type: String, required: true }
                },
                answer: { type: String, required: true },
                explanation: { type: String }
            }
        ]
    },
    { timestamps: true }
);

const Quiz = mongoose.model("quizzes", quizSchema);

export default Quiz;