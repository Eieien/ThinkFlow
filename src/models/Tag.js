import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
    {
        creator: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "users"
        },
        name: { type: String },
        color: {
            type: String,
            default: 'FFFFFF'
        }
    }
)

const Tag = mongoose.model("tags", tagSchema);

export default Tag;