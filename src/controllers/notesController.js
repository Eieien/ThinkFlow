import { unlink, readFile } from "fs/promises";
import path from "path";

import Notes from "../models/Notes.js";
import { userPopulateExcludes } from '../config/mongoConfig.js';

export const getPublicNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ 'options.isPublic': true }).populate("creator", userPopulateExcludes);
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const createNote = async (req, res) => {
  const { creator, title, content } = req.body;
  try {
    const createdNote = await Notes.create({ 
      creator: creator,
      title: title,
      content: content
    });
    return res.status(201).json({
      message: "Note has been created!",
      createdNote: createdNote
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const getOneNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Notes.findById(noteId).populate("creator", userPopulateExcludes);
    return res.status(200).json(note);
  } catch (err) {
    if(err.name === "CastError") return res.status(500).json({ error: 'Invalid note id!' });
    return res.status(500).json({ error: err.message });
  }
}

export const updateNote = async (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ error: 'No content to update!' });
  const noteId = req.params.id;
  const noteData = req.body;
  try {
    const foundNote = await Notes.findById(noteId);
    if(!foundNote) return res.status(404).json({ error: 'Note not found!' });
    if(foundNote.options?.imported && noteData?.content)
      return res.status(400).json({ error: 'Cannot edit contents of imported note!' });

    if(noteData?.title) foundNote.title = noteData.title;
    if(noteData?.content) foundNote.content = noteData.content;
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
    return res.status(500).json({ error: err.message });
  }
}

export const deleteNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if(!deletedNote) return res.status(404).json({ error: "Note not found!" });
    if(deletedNote.options.imported){
      const fileName = deletedNote.content;
      const filePath = path.join(process.cwd(), 'src', 'uploads', 'imported_notes', fileName)
      await unlink(filePath);
    }
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const importNote = async (req, res) => {
  const { creator, title } = req.body;
  const uploaded = req.file;
  try {
    // need to make content into md
    const createdNote = await Notes.create({
      creator: creator,
      title: title,
      content: uploaded.filename
    });
    return res.status(201).json({
      message: "Note has been imported!",
      createdNote: createdNote
    });
  } catch (err) {
    try {
      await unlink(uploaded.path);
    } catch (unlinkErr) {
      return res.status(500).json({ 
        error: err.message + ' ' + unlinkErr.message
      });
    } 
    return res.status(500).json({ error: err.message });
  }
}

export const getImportedNote = async (req, res) => {
  const noteFile = req.params.noteFile;
  try {
    const filePath = path.join(process.cwd(), 'src', 'uploads', 'imported_notes', noteFile);
    await readFile(filePath);
    return res.status(200).sendFile(filePath);
  } catch (err) {
    if(err.name === "CastError") return res.status(500).json({ error: 'Invalid note id!' });
    return res.status(500).json({ error: err.message });
  }
}