import path from "path";
import { fileURLToPath } from "url";

import generateAiContent from "../utils/genAiRes.js";
import { aiQuizDetails } from "../config/genAiConfig.js";
import catchError from "../utils/catchError.js";
import Quiz from "../models/Quiz.js";
import { excludedNoteFields } from "../config/mongoConfig.js";
import Notes from "../models/Notes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const createQuiz = async (req, res) => {
  const noteId = req.body.noteId;
  try {
    const foundNote = await Notes.findById(noteId, excludedNoteFields);
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

export const getQuizByNoteId = async (req, res) => {
  const noteId = req.params.id;
  if(!noteId) return res.status(400).json({ error: 'No note id!' });
  try {
    const foundQuiz = await Quiz.findOne({ note: noteId }, excludedNoteFields);
    if(!foundQuiz) return res.status(404).json({ error: 'Quiz not found!' });
    return res.status(200).json(foundQuiz);
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
}

export const updateQuiz = async (req, res) => {
  const quizId = req.params.id;
  const quizDetails = req.body;
  if(!req.body || Object.keys(req.body).length === 0 ||
    (!quizDetails.quizTitle && !quizDetails.description))
    return res.status(400).json({ error: 'No content to update!' });
  try {
    const foundQuiz = await Quiz.findById(quizId);
    if(!foundQuiz) return res.status(404).json({ error: 'Quiz not found!' });
    if(quizDetails?.quizTitle) foundQuiz.quizTitle = quizDetails.quizTitle;
    if(quizDetails?.description) foundQuiz.description = quizDetails.description;
    const editedQuiz = await foundQuiz.save();
    return res.status(200).json({ 
      message: 'Quiz has been updated!',
      editedQuiz: editedQuiz
    })
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
}

export const deleteQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    await Quiz.findByIdAndDelete(quizId);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
}