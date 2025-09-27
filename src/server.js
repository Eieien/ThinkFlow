import express from "express";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import { connectToMongoDB } from "./config/mongoConfig.js";
import routes from "./routes/router.js";

connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 3000;
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    limit: 10, // 10 requests per windowMs
    message: (req, res) => {
        return res.status(429).json({ error: 'Too many requests, please try again later.' });
    },
    standardHeaders: true
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(limiter);
app.use('/api', routes);

export const appServer = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});