import { Server } from "socket.io";
import { readFile, writeFile } from "fs/promises";

import { getUploadFilePath } from "./utils/getFileDetails.js";

const startSocket = (appServer) => {
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

        // disconnect handlers
        socket.on('leave', (noteId) => {
            socket.leave(noteId);
        })
        socket.on('disconnect', (reason) => {
            console.log("user left for " + reason);
            // can emit to other users in room if user leaves
        });
    });
}

export default startSocket;