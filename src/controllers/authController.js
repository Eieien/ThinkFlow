import jwt from "jsonwebtoken";

import User from "../models/User.js";
import catchError from "../utils/catchError.js";
import { jwtCookieOptions, formatJwtUserData, createJwts } from "../utils/jwtUtils.js";

export default class AuthController {
    static signup = async (req, res) => {
        const { username, email, password, confirmPassword} = req.body;
        try {
            if(password !== confirmPassword) return res.status(400).json({ message: "Passwords don't match!" });
            const createdUser = await User.create({
                username: username,
                email: email,
                password: password
            });
            return res.status(201).json({
                message: "You have been registered to ThinkFlow!"
            });
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static login = async (req, res) => {
        const { email, password } = req.body;
        try {
            const foundUser = await User.findByEmail(email);
            if(!foundUser) return res.status(404).json({ message: "User doesn't exist!" });
            const doMatch = await foundUser.comparePasswords(password);
            if(!doMatch) return res.status(401).json({ message: 'Incorrect password!' });

            const jwtUserData = formatJwtUserData(foundUser);
            const { accessToken, refreshToken } = createJwts(jwtUserData);
            res.cookie('jwt', refreshToken, jwtCookieOptions);
            foundUser.refreshToken = refreshToken;
            await foundUser.save();
            const userDetails = await User.findById(foundUser._id)
                .select("username email");
            return res.status(201).json({
                user: userDetails,
                accessToken: accessToken 
            });
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static refresh = async (req, res) => {
        const refreshToken = req?.cookies?.jwt;
        try {
            if(!refreshToken) return res.sendStatus(401);
            if(!await User.findRefresh(refreshToken)) return res.sendStatus(403);
            const decodedUser = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const userData = formatJwtUserData(decodedUser);
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
            return res.status(201).json({ accessToken: accessToken });
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
    static logout = async (req, res) => {
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
    static changePassword = async (req, res) => {
        const { email, password, confirmPassword } = req.body;
        try {
            if(password !== confirmPassword) return res.status(400).json({ message: 'Passwords don\'t match!' });
            const foundUser = await User.findByEmail(email);
            foundUser.password = password;
            await foundUser.save();
            return res.status(200).json({ message: 'Password has been changed!' });
        } catch (err) {
            return res.status(400).json(catchError(err));
        }
    }
}