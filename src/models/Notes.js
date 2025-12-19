import mongoose from "mongoose";

import { excludeV } from "../config/mongoConfig.js";

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
        description: {
            type: String
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
        },
        access: {
            type: [ mongoose.SchemaTypes.ObjectId ],
            ref: 'users'
        }
    },
    { 
        timestamps: true,
        statics: {
            findPublic: async function(){
                return await this.find({ 'options.isPublic': true }, excludeV)
                    .populate("creator", excludeV)
                    .populate("tags", excludeV);
            },
            findByUserId: async function(userId){
                return await this.find({ creator: userId }, excludeV)
                    .populate("creator", excludeV)
                    .populate("tags", excludeV);
            }
        }
    }
);

const Notes = mongoose.model("notes", notesSchema);

export default Notes;