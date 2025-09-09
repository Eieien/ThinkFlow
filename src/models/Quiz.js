import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
    {
        quiz_content: {
            type: Object
        }
    },
    { timestamps: true }
);

const Quiz = mongoose.model("quizzes", quizSchema);

export default Quiz;