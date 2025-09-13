import Notes from "../models/Notes.js";
import { userPopulateExcludes } from '../utils/mongoConst.js';

export const getPublicNotes = async (req, res) => {
  try {
    const notes = await Notes.find({ 'options.isPublic': true }).populate("creator", userPopulateExcludes);
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const createNote = async (req, res) => {
  const noteData = req.body;
  try {
    const createdNote = await Notes.create(noteData);
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
    return res.status(500).json({ error: err.message });
  }
}

export const updateNote = async (req, res) => {
  if(!req.body || Object.keys(req.body).length === 0) return res.status(400).json({ error: 'No content to update!' });
  const noteId = req.params.id;
  const noteData = req.body;
  try {
    const foundNote = await Notes.findById(noteId);
    if(!foundNote) return res.status(404).json({ error: "Note not found!" });

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
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}