import mongoose from "mongoose";

const accessSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'users'
        },
        note: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'notes'
        }
    },
    { timestamps: true}
)

const Access = mongoose.model("accesses", accessSchema);

export default Access;