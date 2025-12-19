import path from "path";
import { fileURLToPath } from "url";

import generateAiContent from "../utils/genAiRes.js";
import { aiQuizDetails } from "../config/genAiConfig.js";
import catchError from "../utils/catchError.js";
import Quiz from "../models/Quiz.js";
import Notes from "../models/Notes.js";
import { getUploadFilePath } from "../utils/getFileDetails.js";
import { excludeV } from "../config/mongoConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default class QuizController {
  static getPublicQuizzes = async (req, res) => {
    try {
      const publicQuizzes = await Quiz.findPublic();
      return res.status(200).json(publicQuizzes);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }
  static createQuiz = async (req, res) => {
    const noteId = req.body.noteId;
    try {
      const foundNote = await Notes.findById(noteId);
      if(!foundNote) return req.status(404).json({ message: 'Note not found! '});
      const filePath = getUploadFilePath('notes/bin', foundNote.fileContent);
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
  static getOneQuiz = async (req, res) => {
    const quizId = req.params.id;
    try {
      const foundQuiz = await Quiz.findById(quizId, excludeV);
      if(!foundQuiz) return res.status(404).json({ message: 'Quiz not found!' });
      return res.status(200).json(foundQuiz);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }
  static getQuizByNoteId = async (req, res) => {
    const noteId = req.params.id;
    try {
      const foundQuiz = await Quiz.findByNoteId(noteId);
      if(!foundQuiz) return res.status(404).json({ message: 'Quiz not found!' });
      return res.status(200).json(foundQuiz);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }
  static getUserQuizzes = async (req, res) => {
    const userId = req.params.id;
    try {
      const userQuizzes = await Quiz.findByUserId(userId);
      return res.status(200).json(userQuizzes);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }
  static updateQuiz = async (req, res) => {
    const quizId = req.params.id;
    const { quizTitle, description, questions } = req.body;
    try {
      const foundQuiz = await Quiz.findById(quizId);
      if(!foundQuiz) return res.status(404).json({ message: 'Quiz not found!' });
      
      foundQuiz.quizTitle = quizTitle;
      foundQuiz.description = description;
      foundQuiz.questions = questions;

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
      if(!deletedQuiz) return res.status(404).json({ message: "Quiz not found!" });
      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }
}