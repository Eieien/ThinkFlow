import { createPartFromUri, createUserContent } from '@google/genai';
import { lookup } from 'mime-types';

import { genAi, notePrompt, noteSystemInstructions, quizPrompt, quizSystemInstructions } from '../config/genAiConfig.js';

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

export async function generateQuiz(filePath)
{
  const mimeType = lookup(filePath);
    const uploaded = await genAi.files.upload({
      file: filePath,
      config: { mimeType: mimeType }
    });
    const fileData = createPartFromUri(uploaded.uri, uploaded.mimeType);
    const content = createUserContent([ fileData, quizPrompt ]);

    const result = await genAi.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: content,
      config: {
          systemInstruction: quizSystemInstructions,
          thinkingConfig: {
            thinkingBudget: 0
          }
      }
    });
    return JSON.parse(result.text);
}