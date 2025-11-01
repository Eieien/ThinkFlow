import Result from "../models/Result.js"
import catchError from "../utils/catchError.js";

export default class ResultController {
    static getResultsByQuizId = async (req, res) => {
        const quizId = req.params.id;
        try {
            const quizResults = await Result.find({ quiz: quizId });
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
                time: time
            });
            const hr =  (Math.floor(time / 3600)).toString().padStart(2, '0');
            const min = ':' + (Math.floor(time / 60) % 60).toString().padStart(2, '0');
            const sec = ':' + (time % 60).toString().padStart(2, '0');
            const formatedTime = hr + min + sec;
            const editedResult = {
                user: postedResult._id,
                quiz: postedResult.quiz,
                score: postedResult.score,
                time: formatedTime
            }
            return res.status(201).json({ 
                message: 'Result has been submitted!',
                postedResult: editedResult
            }); 
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}