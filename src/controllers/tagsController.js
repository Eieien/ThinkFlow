
import Tag from "../models/Tag.js";
import catchError from "../utils/catchError.js"

export default class TagsController {
    static createTag = async (req, res) => {
        const tagDetails = req.body;
        try {
            const createdTag = await Tag.create(tagDetails);
            return res.status(201).json(createdTag);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }

    static getUserTags = async (req, res) => {
        try {
            const userTags = await Tag.find({ creator: req.params.id });
            return res.status(200).json(userTags);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }

    static deleteTag = async (req, res) => {
        const tagId = req.params.id;
        try {
            const deletedTag = await Tag.findByIdAndDelete(tagId);
            if(!deletedTag) return res.status(404).json({ error: "Tag not found!" });
            return res.sendStatus(204);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}