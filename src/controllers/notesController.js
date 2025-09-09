import Notes from "../models/Notes.js";

export const getAllNotes = async (req, res) => {
  try {
    const notes = await Notes.find().populate("creator");
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const createNote = async (req, res) => {
  try {
    const { userId, title, content } = req.body;
    const createdNote = await Notes.create({
      creator: userId,
      title: title,
      content: content
    });
    return res.status(201).json({ 
      msg: "Note has been created!",
      createdNote: createdNote
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const getOneNote = async (req, res) => {
  const noteId = req.params.id;
  try {
    const note = await Notes.findById(noteId).populate("creator");
    return res.status(200).json(note);
  } catch (err) { 
    return res.status(500).json({ error: err.message });
  }
}

export const updateNote = async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  try {
    const noteId = req.params.id;
    const { title, content } = req.body;
    const note = await Notes.findById(noteId);
    if(!note) return res.status(404).json({ error: "Note not found!" });
    note.title = title;
    note.content = content;
    await note.save();
    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const deletedNote = await Notes.findByIdAndDelete(noteId);
    if(!deletedNote) return res.status(404).json({ error: "Note not found!" });
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}