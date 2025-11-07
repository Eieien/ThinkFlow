import Result from "../models/Result.js"
import catchError from "../utils/catchError.js";
import formatTime from "../utils/formatTime.js";

export default class ResultController {
    static getResults = async (req, res) => {
        const quizId = req.params.id;
        try {
            const quizResults = await Result.findNumResults(quizId);
            const formattedResults = [];
            quizResults.forEach(quizResult => {
                formattedResults.push({
                    score: quizResult.score,
                    time: formatTime(quizResult.time)
                })
            })
            let sums = { score: 0, time: 0 };
            quizResults.forEach(result => {
                sums.score += result.score,
                sums.time += result.time
            })
            const avgScore = (formattedResults.length) ?
                (sums.score / formattedResults.length).toFixed(2) : 0;
            const avgTime = (formattedResults.length) ?
                sums.time / formattedResults.length : 0;

            return res.status(200).json({
                results: formattedResults,
                averageScore: parseFloat(avgScore),
                averageTime: formatTime(avgTime)
            });
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
            return res.status(201).json({ 
                message: 'Your result has been submitted!',
                postedResult: {
                    user: postedResult.user,
                    quiz: postedResult.quiz,
                    score: postedResult.score,
                    time: formatTime(postedResult.time)
                }
            }); 
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}