const quizDataFormat = JSON.stringify({
    "quiz_title": "<name_here>",
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
    "error": "<error_here>",
    "suggestion": "<suggestions_here>"
});

export const quizPrompt = 'Create a 10 mcq quiz based on the contents of this file.';
export const systemInstructions = [
    'Respond in JSON format only, starting with { and ending with }',
    'Make sure to NOT include any backticks (`) in the response',
    `Use this format to generate the response: ${quizDataFormat}`,
    `If the content is unclear, or lacks any educational substance to generate enough questions, use this format to generate the response: ${errorDataFormat}`
]