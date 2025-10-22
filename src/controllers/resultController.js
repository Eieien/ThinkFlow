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
        try {
            const { userId, quizId, score, time } = req.body;
            const formattedTime = new Date(time);

            console.log(formattedTime)
            // const postedResult = await Result.create({
            //     user: userId,
            //     quiz: quizId,
            //     score: score,
            //     time: time
            // });
            return res.status(201).json({ 
                message: 'Result has been posted!',
                postedResult: null
            }); 
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}