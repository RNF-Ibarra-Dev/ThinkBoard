import mongoose from "mongoose";

// schema
// model based from schema
// in MySQL terms this would be the tableof the database 

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } //createdAt updatedAt
);


const Note = mongoose.model("Note", noteSchema);

export default Note;