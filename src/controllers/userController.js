import { unlink } from "fs/promises";

import User from "../models/User.js"
import catchError from "../utils/catchError.js";
import { getUploadFilePath } from "../utils/getFileDetails.js";
import { excludeV } from "../config/mongoConfig.js";
import { existsSync, readFileSync } from "fs";

export default class PfpController {
    static getUsers = async (req, res) => {
        try {
            const users = await User.find().select(excludeV);
            return res.status(200).json(users);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getOneUser = async (req, res) => {
        const userId = req.params.id;
        try {
            const foundUser = await User.findById(userId, excludeV);
            return res.status(200).json(foundUser);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static updateUser = async (req, res) => {
        const userId = req.params.id;
        const userDetails = req.body;
        try {
            const foundUser = await User.findById(userId);
            if(!foundUser) return res.status(404).json({ message: 'User not found!' });

            if(userDetails?.username) foundUser.username = userDetails.username;
            if(userDetails?.email) foundUser.email = userDetails.email;
            if(userDetails?.deactivated) foundUser.deactivated = userDetails.deactivated;

            const updatedUser = await foundUser.save();
            return res.status(200).json(updatedUser);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static getPfp = async (req, res) => {
        const userId = req.params.id;
        try {
            const foundUser = await User.findById(userId);
            if(!foundUser) return res.status(404).json({ message: 'User not found!' });
            const filePath = getUploadFilePath('images/pfps', foundUser.pfp);
            return res.status(200).sendFile(filePath);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static updatePfp = async (req, res) => {
        const userId = req.params.id;
        const pfp = req.file.filename;
        try {
            console.log(pfp);
            const foundUser = await User.findById(userId);
            if(!foundUser) return res.status(404).json({ message: 'User not found!' });
            if(foundUser?.pfp) await unlink(getUploadFilePath('images/pfps', foundUser.pfp));
            foundUser.pfp = pfp;
            await foundUser.save();
            return res.status(200).json({
                message: 'Pfp has been updated!',
                pfp: pfp
            });
        } catch (err) {
            const filePath = getUploadFilePath('pfps', foundUser.pfp);
            if(existsSync(filePath)) await unlink(getUploadFilePath('images/pfps', pfp));
            return res.status(400).json(err);
        }
    }
    static deletePfp = async (req, res) => {
        const userId = req.params.id;
        try {
            const foundUser = await User.findByIdAndUpdate(userId, { $unset: { pfp: '' }});
            if(!foundUser) return res.status(404).json({ message: 'User not found! '});
            if(!foundUser.pfp) return res.status(404).json({ message: 'No pfp to delete!' });
            const filePath = getUploadFilePath('images/pfps', foundUser.pfp);
            await unlink(filePath);
            return res.sendStatus(204);
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}