import { Server } from "socket.io";
import { readFile, writeFile } from "fs/promises";

import { appServer } from "./server.js";
import { getUploadFilePath } from "./utils/getFileDetails.js";

const io = new Server(appServer, {
    cors: {
        origin: '*'
    }
});

io.on('connection', (socket) => {
    console.log(`User ${socket.id} connected`);

    socket.on("joinNote", async ({ noteId, noteFile }) => {
        const filePath = getUploadFilePath('notes', noteFile);
        const mdData = await readFile(filePath);
        socket.join(noteId);
        socket.emit('getContent', mdData.toString());
    });
    socket.on('editNote', async ({ noteId, noteFile, content }) => {
        const filePath = getUploadFilePath('notes', noteFile);
        await writeFile(filePath, content);
        const mdData = await readFile(filePath);
        socket.to(noteId).emit('getContent', mdData.toString());
    });
    socket.on('leave', ({ noteId }) => {
        socket.leave(noteId);
    });
});