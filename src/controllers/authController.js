import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import { jwtCookieOptions, formatJwtUserData } from "../config/jwtConfig.js";

export const signup = async (req, res) => {
    const userData = req.body;
    try {
        const createdUser = await User.create(userData);
        return res.status(201).json({
            message: "User has been created!",
            createdUser: createdUser
        });
    } catch (err) {
        if(err?.code === 11000 ) return res.status(406).json({ error: 'Cannot have duplicate emails!' })
        return res.status(500).json({ error: err });
    }
}

export const login = async (req, res) => {
    const userData = req.body;
    try {
        const foundUser = await User.findOne({ email: userData.email });
        if(!foundUser) return res.status(404).json({ error: 'User not found!' });
        const doMatch = await bcrypt.compare(userData.password, foundUser.password);
        if(!doMatch) return res.status(403).json({ error:'Incorrect password!' });

        const jwtUserData = formatJwtUserData(foundUser);
        const accessToken = jwt.sign(jwtUserData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        const refreshToken = jwt.sign(jwtUserData, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
        res.cookie('jwt', refreshToken, jwtCookieOptions);
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        return res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    try {
        const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await User.findById(decodedUser._id);
        if(!foundUser) return res.status(404).json({ error: "User not found!"});
        const userData = formatJwtUserData(decodedUser);
        const accessToken = jwt.sign(
            userData, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        return res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    try {
        const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        await User.findByIdAndUpdate(decodedUser._id, { $unset: { refreshToken: '' }});
        res.clearCookie('jwt', refreshToken, jwtCookieOptions);
        return res.sendStatus(204);
    } catch (err) {
        res.clearCookie('jwt', refreshToken, jwtCookieOptions);
        return res.sendStatus(200);
    }
}