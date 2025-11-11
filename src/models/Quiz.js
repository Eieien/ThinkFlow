import mongoose from "mongoose";

import { excludeV } from "../config/mongoConfig.js";
import Notes from "./Notes.js";

const quizSchema = new mongoose.Schema(
    {
        note: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "notes",
            required: true
        },
        quizTitle: { 
            type: String,
            required: true
        },
        description: { 
            type: String, 
            required: true
        },
        questions: [
            {
                question: { type: String, required: true },
                options: { 
                    a: { type: String, required: true },
                    b: { type: String, required: true },
                    c: { type: String, required: true },
                    d: { type: String, required: true }
                },
                answer: { type: String, required: true },
                explanation: { type: String }
            }
        ]
    },
    { 
        timestamps: true, 
        statics: {
            findByNoteId: async function(noteId){
                return await this.find({ note: noteId }, excludeV);
            },
            findByUserId: async function(userId){
                const userNotes = await Notes.findByUserId(userId);
                let noteIds = [];
                userNotes.forEach(userNote => noteIds.push(userNote._id));
                return await this.find({ note: { $in: noteIds }}, excludeV);
            },
            findPublic: async function(){
                const publicNotes = await Notes.findPublic();
                let noteIds = [];
                publicNotes.forEach(publicNote => noteIds.push(publicNote._id));
                return await this.find({ note: { $in: noteIds }}, excludeV);
            }
        }
    }
);

const Quiz = mongoose.model("quizzes", quizSchema);

export default Quiz;