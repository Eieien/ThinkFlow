import { unlink, writeFile, rename } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

import Notes from "../models/Notes.js";
import { excludedUserFields, excludedTagFields, excludedNoteFields } from '../config/mongoConfig.js';
import generateAiContent from "../utils/genAiRes.js";
import { aiNoteDetails } from "../config/genAiConfig.js";
import catchError from "../utils/catchError.js";
import Quiz from "../models/Quiz.js";
import { getNoteNameAndPath, getUploadFilePath } from "../utils/getFileDetails.js";

export const getPublicNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ 'options.isPublic': true }, excludedNoteFields)
      .populate("creator", excludedUserFields);
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
} 

export const createNote = async (req, res) => {
  const { userId, title } = req.body;
  const { fileName, filePath } = getNoteNameAndPath();
  try {
    await writeFile(filePath, '');
    const createdNote = await Notes.create({ 
      creator: userId,
      title: title,
      fileContent: fileName
    });
    return res.status(201).json({
      message: "Note has been created!",
      createdNote: createdNote
    });
  } catch (err) {
    if(existsSync(filePath)) await unlink(filePath);
    return res.status(400).json(catchError(err));
  }
}

export const getNotesByUserId = async (req, res) => {
  const userId = req.params.id;
  try {
    const foundNote = await Notes.find({ creator: userId }, excludedNoteFields)
      .populate("creator", excludedUserFields)
      .populate("tags", excludedTagFields);
    if(!foundNote) return res.status(404).json({ error: 'Note not found! '});
    return res.status(200).json(foundNote);
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
}

export const updateNote = async (req, res) => {
  const noteData = req.body;
  const noteId = req.params.id;
  try {
    const foundNote = await Notes.findById(noteId);
    if(!foundNote) return res.status(404).json({ error: 'Note not found!' });
    for(let key of Object.keys(noteData)){
      if(key === 'fileContent') continue;
      foundNote[key] = noteData[key];
    }
    const updatedNote = await foundNote.save();
    return res.status(200).json({
      message: 'Note has been updated!',
      updatedNote: updatedNote
    });
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
}

export const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if(!deletedNote) return res.status(404).json({ error: "Note not found!" });
    const filePath = getUploadFilePath('notes', deletedNote.fileContent);
    if(existsSync(filePath)) await unlink(filePath);
    await Quiz.findOneAndDelete({ note: deletedNote._id });
    return res.sendStatus(204);
  } catch (err) {
    return res.status(400).json(catchError(err));
  }
}

export const importNote = async (req, res) => {
  const { userId, title } = req.body;
  const oldFilePath = req.file.path;
  const { fileName, filePath } = getNoteNameAndPath();
  try {
    if(path.extname(path.basename(oldFilePath)) !== '.md'){
      const result = await generateAiContent(oldFilePath, aiNoteDetails);
      await unlink(oldFilePath);
      if(result?.success){
        await writeFile(filePath, result.success);
      } else {
        return res.status(400).json(result.error);
      }
    } else {
      await rename(oldFilePath, filePath);
    }
    const createdNote = await Notes.create({
      creator: userId,
      title: title,
      fileContent: fileName,
    });
    return res.status(201).json({
      message: "Note has been imported!",
      createdNote: createdNote
    });
  } catch (err) {
    if(existsSync(oldFilePath)) await unlink(oldFilePath);
    if(existsSync(filePath)) await unlink(filePath);
    return res.status(400).json(catchError(err));
  }
}