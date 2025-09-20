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
        questions: [{ type: Object }]
    },
    { timestamps: true }
);

const Quiz = mongoose.model("quizzes", quizSchema);

export default Quiz;