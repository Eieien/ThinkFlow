import { Hocuspocus } from "@hocuspocus/server";
import { writeFile, readFile } from "fs/promises";
import * as Y from "yjs";
import Notes from "../models/Notes.js";

const hocuspocus = new Hocuspocus({
    async onConnect({ documentName }){
        console.log(`Client connected to: ${documentName}`);
    },
    async onDisconnect(data){
        console.log(`user disconnected`);
    },
    async onLoadDocument(data){
        const ydoc = new Y.Doc();
        try {
            const noteData = await Notes.findById(data.documentName);
            console.log(noteData.fileContent);
            const binData = await readFile(`uploads/notes/bin/${noteData.fileContent}`);
            Y.applyUpdate(ydoc, binData);
            return ydoc;
        } catch (e) {
            return ydoc;
        }
    },
    async onStoreDocument(data){
        try {
            const noteData = await Notes.findById(data.documentName);
            console.log(noteData.fileContent);
            const encodedDoc = Y.encodeStateAsUpdate(data.document);
            await writeFile(`uploads/notes/bin/${noteData.fileContent}`, encodedDoc);
            console.log('note stored');
        } catch (e) {
            console.log('note NOT stored');
        }
    }
});

export default hocuspocus;