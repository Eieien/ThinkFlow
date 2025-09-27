

import User from "../models/User.js"
import catchError from "../utils/catchError.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(400).json(catchError(err));
    }
}

export const updatePfp = async (req, res) => {
    const pfp = req.file.filename;
    const userId = req.body.user;
    try {
        const foundUser = await User.findById(userId);
        if(!foundUser) return res.status(404).json({ error: 'User not found! '});
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

export const createTag = async (req, res) => {
    const { userId, tags } = req.body;
    try {
        
    } catch (err) {
        return res.status(400).json(catchError(err));
    }
}