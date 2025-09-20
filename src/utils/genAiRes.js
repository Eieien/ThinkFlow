import { createPartFromUri, createUserContent } from '@google/genai';

import { genAi, notePrompt, noteSystemInstructions } from '../config/genAiConfig.js';

export async function generateMdContent(filePath, mimeType)
{
    const uploaded = await genAi.files.upload({
      file: filePath,
      config: { mimeType: mimeType }
    });
    const fileData = createPartFromUri(uploaded.uri, uploaded.mimeType);
    const content = createUserContent([ fileData, notePrompt ]);

    const result = await genAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: content,
      config: {
          systemInstruction: noteSystemInstructions,
          thinkingConfig: {
            thinkingBudget: 0
          }
      }
    });
    return result.text;
}

export async function generateQuiz()
{

}