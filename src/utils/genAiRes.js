import { createPartFromUri, createUserContent } from '@google/genai';
import { lookup } from 'mime-types';

import { genAi, errorSchema } from '../config/genAiConfig.js';

async function generateAiContent(filePath, { mainSchema, mainPrompt, systemInstructions })
{
  const mimeType = lookup(filePath);
  const uploaded = await genAi.files.upload({
    file: filePath,
    config: { mimeType: mimeType }
  });
  const fileData = createPartFromUri(uploaded.uri, uploaded.mimeType);
  const content = createUserContent([ fileData, mainPrompt ]);

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