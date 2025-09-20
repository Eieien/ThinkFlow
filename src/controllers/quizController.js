import path from "path";
import { fileURLToPath } from "url";

import { generateQuiz } from "../utils/genAiRes.js";
import catchError from "../utils/catchError.js";
import Quiz from "../models/Quiz.js";
import { notePopulateExcludes } from "../config/mongoConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createQuiz = async (req, res) => {
  if(!req.body?.noteId) return res.status(400).json({ error: 'No note ID!' });
  if(!req.body?.fileContent) return res.status(400).json({ error: 'No file content!' });
  const { noteId, fileContent } = req.body;
  const filePath = path.join(__dirname, '..', 'uploads', 'notes', fileContent);
  try {
    const quizResult = await generateQuiz(filePath);
    const { quizTitle, description, questions } = quizResult;
    const createdQuiz = await Quiz.create({
      note: noteId,
      quizTitle: quizTitle,
      description: description,
      questions: questions
    });
    return res.status(201).json({
      message: 'Quiz has been created!',
      createdQuiz: createdQuiz
    });
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const getOneQuiz = async (req, res) => {
  const noteId = req.params.id;
  if(!noteId) return res.status(400).json({ error: 'No quiz id!' });
  try {
    const foundQuiz = await Quiz.findOne({ note: noteId }, notePopulateExcludes);
    if(!foundQuiz) return res.status(404).json({ error: 'Quiz not found!' });
    return res.status(200).json(foundQuiz);
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const updateQuiz = async (req, res) => {

}

export const deleteQuiz = async (req, res) => {

}