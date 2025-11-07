import { Hocuspocus } from "@hocuspocus/server";
import { writeFile, readFile } from "fs/promises";
import * as Y from "yjs";

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
            const binData = await readFile(`uploads/notes/bin/${data.documentName}`);
            Y.applyUpdate(ydoc, binData);
            return ydoc;
        } catch (e) {
            return ydoc;
        }
    },
    async onStoreDocument(data){
        const encodedDoc = Y.encodeStateAsUpdate(data.document);
        await writeFile(`uploads/notes/bin/${data.documentName}`, encodedDoc);
        console.log('note stored');
    }
});

export default hocuspocus;