import express from "express";
import expressWs from "express-ws";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";
import cors from "cors";

import { connectToMongoDB } from "./config/mongoConfig.js";
import hocuspocus from "./config/hocusConfig.js"

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import notesRoutes from "./routes/notesRoutes.js";
import tagRoutes from "./routes/tagRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import verifyToken from "./middleware/verifyToken.js";

connectToMongoDB();

const { app } = expressWs(express());
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 100, // 100 requests per windowMs
    message: (_req, res) => {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
    },
    standardHeaders: true
});

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(limiter);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/tags', tagRoutes);
// router.use(verifyToken);
app.use('/api/users', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultRoutes);

app.ws("/collab", (ws, req) => hocuspocus.handleConnection(ws, req));

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});