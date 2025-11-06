import Tags from "../models/Tag.js";
import User from "../models/User.js";
import Notes from "../models/Notes.js";
import catchError from "../utils/catchError.js";
import { excludeV } from "../config/mongoConfig.js";

export default class TagController {
    static createTag = async (req, res) => {
        const { userId, name, color } = req.body;
        try {
            const foundUser = await User.findById(userId);
            if(!foundUser) return res.status(404).json({ message: 'User not found!' });
            const createdTag = await Tags.create({ 
                creator: userId,
                name: name,
                color: color
            });
            return res.status(201).json(createdTag);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getUserTags = async (req, res) => {
        const userId = req.params.id;
        try {
            const userTags = await Tags.find({ creator: userId }, excludeV);
            return res.status(200).json(userTags);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getOneTag = async (req, res) => {
        const tagId = req.params.id;
        try {
            const tag = await Tags.findById(tagId, excludeV);
            if(!tag) return res.status(404).json({message: 'No tag found!' });
            return res.status(200).json(tag);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static updateTag = async (req, res) => {
        const tagId = req.params.id;
        const { name, color } = req.body;
        try {
            const foundTag  = await Tags.findById(tagId);
            if(!foundTag) return res.status(404).json({ message: 'Tag not found! '})
            foundTag.name = name;
            foundTag.color = color;
            const updatedTag = await foundTag.save();
            return res.status(200).json(updatedTag);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static deleteTag = async (req, res) => {
        const tagId = req.params.id;
        try {
            const deletedTag = await Tags.findByIdAndDelete(tagId);
            if(!deletedTag) return res.status(404).json({ message: "Tag not found!" });
            return res.sendStatus(204);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}