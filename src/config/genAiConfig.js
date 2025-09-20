import { GoogleGenAI } from "@google/genai";

const quizDataFormat = JSON.stringify({
    "quiz_title": "<title_here>",
    "questions": [
        {
            "question": "<question_here>",
            "options": {
                "A": "<option_1>",
                "B": "<option_1>",
                "C": "<option_1>",
                "D": "<option_1>"
            },
            "answer": "<correct_option>",
            "explanation": "<explain_here>"
        }
    ]
}); 
const errorDataFormat = JSON.stringify({
    "error": "<1 sentence error here>",
    "suggestion": "<1 sentence suggestion here>"
});

export const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const notePrompt = 'Create markdown content based on the contents of this file.';
export const noteSystemInstructions = [
    'Respond in markdown/md format only',
    'Make sure to NOT include any backticks (`) in the response',
    `If the content is unclear, or lacks any educational substance to generate notes, use this JSON format to generate the response: ${errorDataFormat}`
];

export const quizPrompt = 'Create a 10 mcq quiz based on the contents of this file.';
export const quizSystemInstructions = [
    'Respond in JSON format only, starting with { and ending with }',
    'Make sure to NOT include any backticks (`) in the response',
    `Use this format to generate the response: ${quizDataFormat}`,
    `If the content is unclear, or lacks any educational substance to generate enough questions, use this format to generate the response: ${errorDataFormat}`
];