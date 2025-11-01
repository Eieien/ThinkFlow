import { unlink } from "fs/promises";

import User from "../models/User.js"
import catchError from "../utils/catchError.js";
import { getUploadFilePath } from "../utils/getFileDetails.js";
import { excludedUserFields } from "../config/mongoConfig.js";

export default class PfpController {
    static getUsers = async (req, res) => {
        try {
            const users = await User.find().select(excludedUserFields);
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getOneUser = async (req, res) => {
        const userId = req.params.id;
        try {
            const users = await User.findById(userId, excludedUserFields);
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static updatePfp = async (req, res) => {
        const pfp = req.file.filename;
        const userId = req.params.id;
        try {
            const foundUser = await User.findById(userId);
            if(!foundUser) return res.status(404).json({ error: 'User not found! '});
            if(foundUser?.pfp) await unlink(getUploadFilePath('pfps', foundUser.pfp));
            foundUser.pfp = pfp;
            await foundUser.save();
            return res.status(200).json({ 
                message: 'Pfp has been updated!',
                pfp: pfp
            });
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static deletePfp = async (req, res) => {
        const userId = req.params.id;
        try {
            const foundUser = await User.findByIdAndUpdate(userId, { $unset: { pfp: '' }});
            if(!foundUser) return res.status(404).json({ error: 'User not found! '});
            if(!foundUser.pfp) return res.status(404).json({ error: 'No pfp to delete!' });
            const filePath = getUploadFilePath('pfps', foundUser.pfp);
            await unlink(filePath);
            return res.status(200).json({ message: 'Pfp has been deleted!' });
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getPfp = async (req, res) => {
        const pfp = req.params.img;
        try {
            const filePath = getUploadFilePath('pfps', pfp);
            return res.status(200).sendFile(filePath);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static createTag = async (req, res) => {
        const tagDetails = req.body;
        try {
            const foundUser = await User.findById(tagDetails.userId);
            const createdTag = foundUser.tags.create(tagDetails);
            foundUser.tags.push(createdTag);
            await foundUser.save();
            return res.status(201).json(createdTag);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getUserTags = async (req, res) => {
        // try {
        //     const userTags = await Tag.find({ creator: req.params.id });
        //     return res.status(200).json(userTags);
        // } catch (err) {
        //     return res.status(400).json(catchError(err));
        // }
    }
    static deleteTag = async (req, res) => {
        // const tagId = req.params.id;
        // try {
        //     const deletedTag = await Tag.findByIdAndDelete(tagId);
        //     if(!deletedTag) return res.status(404).json({ error: "Tag not found!" });
        //     return res.sendStatus(204);
        // } catch (err) {
        //     return res.status(400).json(catchError(err));
        // }
    }
}