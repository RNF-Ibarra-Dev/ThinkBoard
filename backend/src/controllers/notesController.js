// export const getAllNotes = (req, res) => {
//   res.status(200).send("You just fetched the notes.");
// };

import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  // res.status(200).send("You just fetched the notes.");
  try {
    const notes = await Note.find().sort({createdAt: -1});
    // sort -1 -> descending 
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function getNoteById(req, res) {
  try {
    const note = await Note.findById(req.params.id);
    if(!note) return res.status(404).json({message:"Note not found"});
    res.status(200).json(note);
  } catch (error) {
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function createNote(req, res) {
  // res.status(201).json({ message: "Note created successfully!" });

  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });

    const savedNote = await note.save();
    res.status(201).json(savedNote);
  } catch (error) {
    console.error("Error in createNote controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function updateNote(req, res) {
  // res.status(200).json({ message: "Note updated successfully!" });
  try {
    const { title, content } = req.body;
    const noteUpdate = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );
    if (!noteUpdate) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(noteUpdate);
  } catch (error) {
    console.error("Error in upda teNote controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}

export async function deleteNote(req, res) {
  // res.status(200).json({ message: "Note deleted successfully!" });

  try {
    // const {}
    const noteDelete = await Note.findByIdAndDelete(req.params.id);
    if (!noteDelete)
      return res.status(404).json({ message: "Note not found." });

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("Error in deleteNote controller", error);
    res.status(500).json({ message: "Internal server error." });
  }
}
