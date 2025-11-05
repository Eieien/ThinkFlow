import Result from "../models/Result.js"
import catchError from "../utils/catchError.js";
import formatTime from "../utils/formatTime.js";

export default class ResultController {
    static getResults = async (req, res) => {
        const quizId = req.params.id;
        try {
            const quizResults = await Result.findByQuizId(quizId);
            return res.status(200).json(quizResults);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }

    static postResult = async (req, res) => {
        const { userId, quizId, score, time } = req.body;
        try {
            const postedResult = await Result.create({
                user: userId,
                quiz: quizId,
                score: score,
                time: formatTime(time)
            });
            return res.status(201).json({ 
                message: 'Result has been submitted!',
                postedResult: postedResult
            }); 
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}