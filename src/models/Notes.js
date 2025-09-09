import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
            required: true
        },
        accesses: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
        }],
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        tags: [{ 
            type: String 
        }]
    },
    { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);

export default Notes;