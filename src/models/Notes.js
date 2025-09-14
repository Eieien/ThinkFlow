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
            required: true
        },
        content: {
            type: String,
        },
        options: {
            isPublic: {
                type: Boolean,
                default: false
            },
            bookmarked: {
                type: Boolean,
                default: false
            },
            imported: {
                type: Boolean,
                default: false
            }
        },
        tags: [{
            type: String 
        }],
        editHistory: [{
            editedBy: { 
                type: mongoose.SchemaTypes.ObjectId,
                ref: "users"
            },
            updatedAt: { 
                type: Date,
                default: new Date()
            }
        }]
    },
    { timestamps: true }
);

const Notes = mongoose.model("notes", notesSchema);

export default Notes;