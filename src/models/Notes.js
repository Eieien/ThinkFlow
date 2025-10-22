import mongoose from "mongoose";

import { excludedNoteFields, excludedTagFields, excludedUserFields } from "../config/mongoConfig.js";

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
        tags: {
            type: [ mongoose.SchemaTypes.ObjectId ],
            ref: "tags"
        }
    },
    { 
        timestamps: true,
        statics: {
            findPublic: async function(){
                return await this.find({ 'options.isPublic': true }, excludedNoteFields)
                    .populate("creator", excludedUserFields);
            },
            findByUserId: async function(userId){
                return await this.find({ creator: userId }, excludedNoteFields)
                    .populate("creator", excludedUserFields)
                    .populate("tags", excludedTagFields);
            }
        }
    }
);

const Notes = mongoose.model("notes", notesSchema);

export default Notes;