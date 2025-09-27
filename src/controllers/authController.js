import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import catchError from "../utils/catchError.js";
import { jwtCookieOptions, formatJwtUserData, createJwts } from "../utils/jwtUtils.js";

export const signup = async (req, res) => {
    const userData = req.body;
    try {
        const createdUser = await User.create(userData);
        return res.status(201).json({
            message: "User has been created!",
            createdUser: createdUser
        });
    } catch (err) {
        return res.status(400).json(catchError(err));
    }
}

export const login = async (req, res) => {
    const userData = req.body;
    try {
        const foundUser = await User.findByEmail(userData.email);
        if(!foundUser) return res.status(404).json({ error: 'User not found!' });
        const doMatch = await foundUser.comparePasswords(userData.password);
        if(!doMatch) return res.status(401).json({ error: 'Incorrect password!' });

        const jwtUserData = formatJwtUserData(foundUser);
        const { accessToken, refreshToken } = createJwts(jwtUserData);
        res.cookie('jwt', refreshToken, jwtCookieOptions);
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        return res.status(201).json({
            id: foundUser._id,
            pfp: foundUser.pfp,
            accessToken: accessToken 
        });
    } catch (err) {
        return res.status(400).json(catchError(err));
    }
}

export const refresh = async (req, res) => {
    const refreshToken = req.cookies.jwt;
    try {
        const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await User.findById(decodedUser._id);
        if(!foundUser) return res.status(404).json({ error: "User not found!" });
        const userData = formatJwtUserData(decodedUser);
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
        return res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(400).json(catchError(err));
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
        return res.status(400).json(catchError(err));
    }
}

export const changePassword = async (req, res) => {
    const { email, password, confPassword } = req.body;
    try {
        if(password !== confPassword) return res.status(400).json({ error: 'Passwords don\'t match!' });
        const foundUser = await User.findByEmail(email);
        foundUser.password = password;
        await foundUser.save();
        return res.status(200).json({ message: 'Password has been change!' });
    } catch (err) {
        return res.status(400).json(catchError(err));
    }
}