import fs from "fs/promises";

import { quizPrompt, quizSystemInstructions } from "../config/genAiConfig.js";

export const createQuiz = async (req, res) => {
  // const filePath = req.file.path;
  // const mimeType = req.file.mimetype;
  // try {
  //   const uploaded = await ai.files.upload({
  //     file: filePath, 
  //     config: { mimeType: mimeType }
  //   });
  //   const fileData = createPartFromUri(uploaded.uri, uploaded.mimeType);
  //   const content = createUserContent([
  //     fileData,
  //     quizPrompt
  //   ]);

  //   const result = await ai.models.generateContent({
  //     model: 'gemini-2.5-flash',
  //     contents: content,
  //     config: {
  //         systemInstruction: systemInstructions
  //     }
  //   }); 

  //   const quizResult = JSON.parse(result.text);
  //   if(quizResult.hasOwnProperty('error')){
  //     await fs.unlink(filePath);
  //     return res.status(400).json(quizResult);
  //   }
  //   return res.status(201).json(quizResult);
  // } catch (err) {
  //   await fs.unlink(filePath);
  //   return res.status(500).json({ error: err.message });
  // }
}

export const getQuiz = async (req, res) => {
  
}