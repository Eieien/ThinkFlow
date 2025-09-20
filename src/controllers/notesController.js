import { unlink, writeFile, rename } from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { randomBytes } from "crypto";

import Notes from "../models/Notes.js";
import { userPopulateExcludes } from '../config/mongoConfig.js';
import { generateMdContent } from "../utils/genAiRes.js";
import catchError from "../utils/catchError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getNotes = async (req, res) => {
  let notes;
  try {
    if(req?.query?.creator)
      notes = await Notes.find({ creator: req.query.creator }).populate("creator", userPopulateExcludes);
    else
      notes = await Notes.find({ 'options.isPublic': true }).populate("creator", userPopulateExcludes);
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const createNote = async (req, res) => {
  const { creator, title } = req.body;
  const randomHex = randomBytes(16).toString('hex');
  const fileName = randomHex + '.md';
  const filePath = path.join(__dirname, '..', 'uploads', 'notes', fileName);
  try {
    await writeFile(filePath, '');
    const createdNote = await Notes.create({ 
      creator: creator,
      title: title,
      file_content: fileName
    });
    return res.status(201).json({
      message: "Note has been created!",
      createdNote: createdNote
    });
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const getOneNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const foundNote = await Notes.findById(noteId).populate("creator", userPopulateExcludes);
    if(!foundNote) return res.status(404).json({ error: 'Note not found! '});
    return res.status(200).json(foundNote);
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const updateNote = async (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) 
    return res.status(400).json({ error: 'No content to update!' });
  const noteId = req.params.id;
  const noteData = req.body;
  try {
    const foundNote = await Notes.findById(noteId);
    if(!foundNote) return res.status(404).json({ error: 'Note not found!' });

    if(noteData?.title) foundNote.title = noteData.title;
    if(noteData?.accesses) foundNote.accesses = noteData.accesses;
    if(noteData?.options){
      const options = noteData.options;
      if(options?.isPublic) foundNote.options.isPublic = options.isPublic;
      if(options?.bookMarked) foundNote.options.isPublic = options.bookMarked;
    }
    const updatedNote = await foundNote.save();
    return res.status(200).json({
      message: 'Note has been updated!',
      updatedNote: updatedNote
    });
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if(!deletedNote) return res.status(404).json({ error: "Note not found!" });
    const fileName = deletedNote.file_content;
    const filePath = path.join(__dirname, '..', 'uploads', 'notes', fileName);
    await unlink(filePath);
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json(catchError(err));
  }
}

export const importNote = async (req, res) => {
  const { creator, title } = req.body;
  const filePath = req.file.path;
  const mimeType = req.file.mimetype;

  const randomHex = randomBytes(16).toString('hex');
  const fileName = randomHex + '.md';
  const newFilePath = path.join(__dirname, '..', 'uploads', 'notes', fileName);
  try {
    const importedName = path.basename(filePath);

    if(path.extname(importedName) !== '.md'){
      const mdResult = await generateMdContent(filePath, mimeType);
      try {
        const jsonResult = JSON.parse(mdResult);
        await unlink(filePath);
        return res.status(400).json(jsonResult);
      } catch (e) {
        await writeFile(newFilePath, mdResult);
        await unlink(filePath);
      }
    } else {
      await rename(filePath, newFilePath);
    }

    const createdNote = await Notes.create({
      creator: creator,
      title: title,
      file_content: fileName,
    });

    return res.status(201).json({
      message: "Note has been imported!",
      createdNote: createdNote
    });
  } catch (err) {
    try {
      if(existsSync(filePath)) await unlink(filePath);
      if(existsSync(newFilePath)) await unlink(newFilePath);
    } catch (unlinkErr) {
      const errs = { message: err.message + ' CANNOT UNLINK: ' + unlinkErr.message };
      return res.status(500).json(catchError(errs));
    }
    return res.status(500).json(catchError(err));
  }
}