import { GoogleGenAI } from "@google/genai";

const quizDataFormat = JSON.stringify({
    "quizTitle": "<title_here>",
    "description": "<description_here>",
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
        },
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
        },
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
    "error": "<less than 20 words 1 sentence error here>",
    "suggestion": "<1 sentence suggestion here>"
});

export const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const notePrompt = 'Create markdown content based on the contents of this file.';
export const noteSystemInstructions = [
    'Respond in markdown/md format only',
    'Make sure to NOT include any backticks (`) in the response',
    `If the content is unclear or lacks any major educational substance with little to no words to generate notes, use this JSON format to generate the response: ${errorDataFormat}`,
    'If content is handwritten, check if it can still be converted into md format following other instructions'
];

export const quizPrompt = 'Create a 10 mcq quiz based on the contents of this md file.';
export const quizSystemInstructions = [
    'Respond in JSON format only, starting with { and ending with }',
    'Make sure to NOT include any backticks (`) in the response',
    `Use this format to generate the response: ${quizDataFormat}`,
    `If the content is unclear, or lacks any educational substance to generate enough questions, use this format to generate the response: ${errorDataFormat}`
];