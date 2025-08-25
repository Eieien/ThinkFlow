import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import User from "../models/User.js";
import { formatJwtUserData, jwtCookieOptions } from "../config/jwtSettings.js";

export const signup = async (req, res) => {
    const user = req.body;
    try {
        const newUser = await User.create(user);
        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(500).json(err);
    }
}

export const login = async (req, res) => {
    if(req.cookies?.jwt) return res.status(400).send('You are already logged in!');
    const { username, password } = req.body;
    try {
        const foundUser = await User.findOne({ username: username });
        if(!foundUser) return res.status(404).send('User not found!');
        const doMatch = await bcrypt.compare(password, foundUser.password);
        if(!doMatch) return res.status(403).send('Incorrect password!');

        const userData = formatJwtUserData(foundUser);
        const accessToken = jwt.sign(
            userData, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        const refreshToken = jwt.sign(
            userData, 
            process.env.REFRESH_TOKEN_SECRET, 
            { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
        );
        res.cookie('jwt', refreshToken, jwtCookieOptions);
        foundUser.refreshToken = refreshToken;
        await foundUser.save();
        return res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(406).json(err);
    }
}

export const refresh = async (req, res) => {
    if(!req.cookies?.jwt) return res.sendStatus(403);
    const refreshToken = req.cookies.jwt;
    try {
        const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const foundUser = await User.findById(decodedUser._id);
        if(!foundUser) return res.sendStatus(404);
        const userData = formatJwtUserData(decodedUser);
        const accessToken = jwt.sign(
            userData, 
            process.env.ACCESS_TOKEN_SECRET, 
            { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
        );
        return res.status(201).json({ accessToken: accessToken });
    } catch (err) {
        return res.status(401).json(err);
    }
}

export const logout = async (req, res) => {
    if(!req.cookies?.jwt) return res.sendStatus(404);
    const refreshToken = req.cookies.jwt;
    try {
        const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        await User.findByIdAndUpdate(
            decodedUser._id,
            { $unset: { refreshToken: null }}
        );
        res.clearCookie('jwt', refreshToken, jwtCookieOptions);
        return res.sendStatus(204);
    } catch (err) {
        res.clearCookie('jwt', refreshToken, jwtCookieOptions);
        return res.status(200).json(err);
    }
}