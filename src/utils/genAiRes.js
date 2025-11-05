import { createPartFromUri, createUserContent } from '@google/genai';
import { lookup } from 'mime-types';
import * as Y from "yjs";
import { readFile } from "fs/promises";
import { extname } from "path";

import { yXmlFragmentToProseMirrorRootNode, prosemirrorToYXmlFragment } from 'y-prosemirror';
import { getSchema } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit'
import { renderToMarkdown } from '@tiptap/static-renderer/pm/markdown'

import { genAi, errorSchema } from '../config/genAiConfig.js';

async function generateAiContent(filePath, { mainSchema, mainPrompt, systemInstructions })
{
  const mimeType = lookup(filePath);
  let content;
  if(mimeType === "application/octet-stream" || extname(filePath) === ".bin"){
    const ydoc = new Y.Doc();
    const binData = await readFile(filePath);
    Y.applyUpdate(ydoc, binData);
    const yXml = ydoc.getXmlFragment('default');
    const node = yXmlFragmentToProseMirrorRootNode(yXml, getSchema([StarterKit]));
    const mdContent = renderToMarkdown({
      extensions: [StarterKit],
      content: node.toJSON()
    });
    content = mainPrompt + mdContent;
  } else {
    const uploaded = await genAi.files.upload({
      file: filePath,
      config: { mimeType: mimeType }
    });
    const fileData = createPartFromUri(uploaded.uri, uploaded.mimeType);
    content = createUserContent([ fileData, mainPrompt ]);
  }

  const result = await genAi.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: content,
    config: {
      responseMimeType: 'application/json', 
      responseSchema: {
        type: 'object',
        properties: {
          success: mainSchema, 
          error: errorSchema
        }
      },
      systemInstruction: systemInstructions
    }
  });
  return JSON.parse(result.text);
}

export default generateAiContent;