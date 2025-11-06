import { GoogleGenAI, Type } from "@google/genai";

export const genAi = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const noteSchema = { type: Type.STRING };
const notePrompt = 'Create markdown content based on the contents of this file.';
const noteSystemInstructions = [
    'Generate a JSON object that is either md content or an error message.',
    'If you have enough information to generate md content, follow the "noteSchema"',
    'If the content is insufficient or unclear, follow the "errorSchema"',
    'Make sure the error message is one sentence only that does NOT mention that you are trying to generate markdown'
];
export const aiNoteDetails = { 
    mainSchema: noteSchema, 
    mainPrompt: notePrompt, 
    systemInstructions: noteSystemInstructions 
};

const quizSchema = {
    type: Type.OBJECT,
    properties: {
        quizTitle: { type: Type.STRING },
        description: { type: Type.STRING },
        questions: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING },
                    options: { 
                        type: Type.OBJECT,
                        properties: {
                            a: { type: Type.STRING },
                            b: { type: Type.STRING },
                            c: { type: Type.STRING },
                            d: { type: Type.STRING }
                        }
                    },
                    answer: { type: Type.STRING },
                    explanation: { type: Type.STRING },
                },
                required: ['question', 'options', 'answer', 'explanation'],
            },
        }
    },
    required: ['quizTitle', 'description', 'questions'],
};
const quizPrompt = 'Create a 10 mcq quiz based on this markdown content:\n\n';
const quizSystemInstructions = [
    'Generate a JSON object that is either a quiz or an error message.',
    'If you have enough information to generate a quiz, follow the "quizSchema"',
    'If the content is insufficient or unclear, follow the "errorSchema"',
    'Make sure the error message is one sentence only'
];
export const aiQuizDetails = { 
    mainSchema: quizSchema, 
    mainPrompt: quizPrompt, 
    systemInstructions: quizSystemInstructions 
};

export const errorSchema = {
    type: Type.OBJECT,
    properties: {
        message: {
            type: Type.STRING,
        },
        suggestion: {
            type: Type.STRING,
        }
    },
    required: ['message', 'suggestion'],
};