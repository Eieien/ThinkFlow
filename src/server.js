import express from "express";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import path from "path";
import { readFile, writeFile } from "fs/promises";

import { connectToMongoDB } from "./config/mongoConfig.js";
import routes from "./routes/router.js";

connectToMongoDB();

const app = express();
const PORT = process.env.PORT || 3000;
const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api', routes);

const appServer = app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

const io = new Server(appServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("joinNote", async ({ noteId, noteFile }) => {
        const filePath = path.join(__dirName, '..', 'uploads', 'notes', noteFile);
        const mdData = await readFile(filePath);
        socket.join(noteId);
        socket.emit('getContent', mdData.toString());
    });
    socket.on('editNote', async ({ noteId, noteFile, content }) => {
        const filePath = path.join(__dirName, '..', 'uploads', 'notes', noteFile);
        await writeFile(filePath, content);
        const mdData = await readFile(filePath);
        socket.to(noteId).emit('getContent', mdData.toString());
    });
    socket.on('leave', ({ noteId }) => {
        socket.leave(noteId);
    });
});