import express from "express";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import { connectToMongoDB } from "./config/mongoConfig.js";
import startSocket from "./socket.js" 

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import notesRoutes from "./routes/notesRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import resultRoutes from "./routes/resultRoutes.js";
import verifyToken from "./middleware/verifyToken.js";

connectToMongoDB();

const app = express();
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
app.use(limiter);

// routes
app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);
// router.use(verifyToken);
app.use('/api/user', userRoutes);
app.use('/api/quiz', quizRoutes);
app.use('/api/results', resultRoutes);

const appServer = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});
startSocket(appServer);