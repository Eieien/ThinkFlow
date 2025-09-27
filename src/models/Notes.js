import mongoose from "mongoose";

const notesSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users",
            required: true
        },
        title: {
            type: String,
            required: true
        },
        fileContent: { 
            type: String,
            required: true
        },
        options: {
            isPublic: {
                type: Boolean,
                default: false
            },
            bookmarked: {
                type: Boolean,
                default: false
            }
        },
        tags: [{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "tags"
        }]
    },
    { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);

export default Notes;