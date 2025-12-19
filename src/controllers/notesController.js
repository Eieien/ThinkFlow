import { unlink, writeFile, readFile, rename } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import MarkdownIt from 'markdown-it';

import Notes from "../models/Notes.js";
import generateAiContent from "../utils/genAiRes.js";
import { aiNoteDetails } from "../config/genAiConfig.js";
import catchError from "../utils/catchError.js";
import Quiz from "../models/Quiz.js";
import { createNoteNameAndPath, getUploadFilePath } from "../utils/getFileDetails.js";
import { excludeV } from "../config/mongoConfig.js";

export default class NotesController {
  static getPublicNotes = async (req, res) => {
    try {
      const notes = await Notes.findPublic();
      return res.status(200).json(notes);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static getOneNote = async (req, res) => {
    const noteId = req.params.id;
    try {
      const note = await Notes.findById(noteId, excludeV)
        .populate("creator", excludeV)
        .populate("tags", excludeV + "-creator");
      return res.status(200).json(note);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static getNotesByUserId = async (req, res) => {
    const userId = req.params.id;
    try {
      const foundNotes = await Notes.findByUserId(userId);
      return res.status(200).json(foundNotes);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static createNote = async (req, res) => {
    const { userId, title, description } = req.body;
    const { fileName, filePath } = createNoteNameAndPath();
    try {
      await writeFile(filePath, '');
      const createdNote = await Notes.create({ 
        creator: userId,
        title: title,
        description: description,
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

  static updateNote = async (req, res) => {
    const { title, description, options, tags, access } = req.body;
    const noteId = req.params.id;
    try {
      const foundNote = await Notes.findById(noteId);
      if(!foundNote) return res.status(404).json({ message: "Note not found!" });
      foundNote.title = title;
      foundNote.description = description;
      foundNote.options = options;
      foundNote.tags = tags;
      foundNote.access = access;
      const updatedNote = await foundNote.save();
      return res.status(200).json({
        message: 'Note has been updated!',
        updatedNote: updatedNote
      });
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static deleteNote = async (req, res) => {
    const noteId = req.params.id;
    try {
      const deletedNote = await Notes.findByIdAndDelete(noteId);
      if(!deletedNote) return res.status(404).json({ message: "Note not found!" });
      const filePath = getUploadFilePath('notes/bin', deletedNote.fileContent);
      if(existsSync(filePath)) await unlink(filePath);
      await Quiz.findOneAndDelete({ note: deletedNote._id });
      return res.sendStatus(204);
    } catch (err) {
      return res.status(400).json(catchError(err));
    }
  }

  static importNote = async (req, res) => {
    const oldFilePath = req.file.path;
    try {
      let mdContent;
      if(path.extname(path.basename(oldFilePath)) !== '.md'){
        const result = await generateAiContent(oldFilePath, aiNoteDetails);
        if(result?.success){
          mdContent = result.success;
        } else {
          await unlink(oldFilePath);
          return res.status(400).json(result.error);
        }
      } else {
        mdContent = await readFile(oldFilePath, 'utf8');
      }
      await unlink(oldFilePath);
      const md = new MarkdownIt();
      const htmlContent = md.render(mdContent);
      return res.status(201).json({
        message: "Content has been imported!",
        html: htmlContent
      });
    } catch (err) {
      if(existsSync(oldFilePath)) await unlink(oldFilePath);
      return res.status(400).json(catchError(err));
    }
  }
}