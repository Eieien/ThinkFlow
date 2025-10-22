import path from "path";
import { fileURLToPath } from "url";

import generateAiContent from "../utils/genAiRes.js";
import { aiQuizDetails } from "../config/genAiConfig.js";
import catchError from "../utils/catchError.js";
import Quiz from "../models/Quiz.js";
import Notes from "../models/Notes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class QuizController {
  static createQuiz = async (req, res) => {
    const noteId = req.body.noteId;
    try {
      const foundNote = await Notes.findById(noteId);
      if(!foundNote) return req.status(404).json({ error: 'Note not found! '});
      const filePath = path.join(__dirname, '..', 'uploads', 'notes', foundNote.fileContent);
      const result = await generateAiContent(filePath, aiQuizDetails);
      if(result.error) return res.status(400).json(result.error);
      const { quizTitle, description, questions } = result.success;
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
      return res.status(400).json(catchError(err));
    }
  }

  static getQuizByNoteId = async (req, res) => {
    const noteId = req.params.id;
    if(!noteId) return res.status(400).json({ error: 'No note id!' });
    try {
      const foundQuiz = await Quiz.findByNoteId(noteId);
      if(!foundQuiz) return res.status(404).json({ error: 'Quiz not found!' });
      return res.status(200).json(foundQuiz);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static updateQuiz = async (req, res) => {
    const quizId = req.params.id;
    const quizDetails = req.body;
    try {
      const foundQuiz = await Quiz.findById(quizId);
      if(!foundQuiz) return res.status(404).json({ error: 'Quiz not found!' });
      for(let key of Object.keys(quizDetails)){
        foundQuiz[key] = quizDetails[key];
      }
      const editedQuiz = await foundQuiz.save();
      return res.status(200).json({ 
        message: 'Quiz has been updated!',
        editedQuiz: editedQuiz
      })
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static deleteQuiz = async (req, res) => {
    const quizId = req.params.id;
    try {
      const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
      if(!deletedQuiz) return res.status(404).json({ error: "Quiz not found!" });
      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }
}