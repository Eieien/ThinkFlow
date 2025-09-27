import Result from "../models/Result.js"
import catchError from "../utils/catchError.js";

export const getResultsByQuizId = async (req, res) => {
    const quizId = req.params.id;
    try {
        const quizResults = await Result.find({ quiz: quizId });
        return res.status(200).json(quizResults);
    } catch (err) {
        return res.status(400).json(catchError(err));
    }
}