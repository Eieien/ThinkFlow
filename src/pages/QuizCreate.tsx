import UserLayout from "@/components/layout/User/UserLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function QuizCreator() {
    // State to store all questions with their answers
    // Each question has: id, text (the question), and answers array
    const [questions, setQuestions] = useState([
    {
        id: 1,
        text: "What is needed for a linked list",
        answers: [
        { id: 1, text: "" },
        ]
    },
    { id: 2, text: "", answers: []},
    ]);

    // State to track which question is currently being displayed/edited (index-based)
    const [currentQuestion, setCurrentQuestion] = useState(0);

    // Function to add a new empty question to the list
    const addNewQuestion = () => {
    const newQuestion = {
        id: questions.length + 1, // Generate new ID based on current length
        text: "", // Empty question text
        answers: [], // No answers initially
        isAnswered: false,
    };
    // Add the new question to the existing questions array
    setQuestions([...questions, newQuestion]);
    };

    // Function to delete a specific question by its ID
    const deleteQuestion = (questionId: number) => {
    if (questions.length === 1) return; // Prevent deletion if it's the last question
    
    // Filter out the question with the matching ID
    const updatedQuestions = questions.filter((q) => q.id !== questionId);
    setQuestions(updatedQuestions);
    // If we deleted the currently viewed question, move to the last question
    if (currentQuestion >= updatedQuestions.length) {
        setCurrentQuestion(updatedQuestions.length - 1);
    }
    };

    // Function to update the text of the currently displayed question
    const updateQuestionText = (text: string) => {
    const updatedQuestions = [...questions]; // Create a copy of questions array
    updatedQuestions[currentQuestion].text = text; // Update the current question's text
    setQuestions(updatedQuestions); // Save the changes
    };

    // Function to update the text of a specific answer in the current question
    const updateAnswerText = (answerId: number, text: string) => {
    const updatedQuestions = [...questions]; // Create a copy of questions array

    // Find the index of the answer with the matching ID
    const answerIndex = updatedQuestions[currentQuestion].answers.findIndex(
        (a) => a.id === answerId
    );
    // If answer exists, update its text
    if (answerIndex !== -1) {
        updatedQuestions[currentQuestion].answers[answerIndex].text = text;
        setQuestions(updatedQuestions); // Save the changes
    }
    };

    // Function to remove a specific answer from the current question
    const removeAnswer = (answerId: number) => {
    const updatedQuestions = [...questions]; // Create a copy of questions array
    
    // Filter out the answer with the matching ID
    updatedQuestions[currentQuestion].answers = updatedQuestions[
        currentQuestion
    ].answers.filter((answer) => answer.id !== answerId);
    setQuestions(updatedQuestions); // Save the changes
    };

    // Function to add a new empty answer to the current question
    const addNewAnswer = () => {
    const updatedQuestions = [...questions]; // Create a copy of questions array
    const newAnswer = {
        id: updatedQuestions[currentQuestion].answers.length + 1, // Generate new ID
        text: "", // Empty answer text
    };

    // Add the new answer to the current question's answers array
    updatedQuestions[currentQuestion].answers.push(newAnswer);
    setQuestions(updatedQuestions); // Save the changes
    };

  return (
    <UserLayout title="Quiz Creator" description="Create your quiz">
      <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white mb-5">
        Prog 2 Notes Quiz
      </h3>

      <section className="w-full flex justify-between gap-4">
        {/* Left Sidebar */}
        <div className="flex flex-col gap-2 w-64">
        <Button className="w-full cursor-pointer bg-[#492AE5] hover:bg-[#3d23c4] text-white h-9">
            Publish Quiz
        </Button>

        <div className="flex flex-col gap-2 max-h-[450px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-2 
        [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-primary-dark [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-primary-dark 
        dark:[&::-webkit-scrollbar-thumb]:bg-primary-white dark:[&::-webkit-scrollbar-thumb]:hover:bg-primary-white dark:[&::-webkit-scrollbar-track]:bg-dark-3">
            {questions.map((question, index) => (
            <div key={question.id} className="relative">
                <Button
                variant="outline"
                onClick={() => setCurrentQuestion(index)}
                className={`w-full justify-start cursor-pointer h-9 text-sm ${
                    currentQuestion === index
                    ? "bg-gray-100 dark:bg-[#1A1A1A]"
                    : ""
                }`}
                >
                <span className="truncate mr-2">
                    Question {index + 1}{question.text ? `: ${question.text}` : ": Untitled"}
                </span>
                </Button>
                {questions.length > 1 && (
                <button
                    onClick={() => deleteQuestion(question.id)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer text-lg"
                >
                    ×
                </button>
                )}
            </div>
            ))}
        </div>

        <Button
            variant="outline"
            onClick={addNewQuestion}
            className="justify-start cursor-pointer bg-[#FCFCFD] dark:bg-[#2B2B2B] hover:bg-[#D6D9DB] dark:hover:bg-[#3B3B3B] border-[#D6D9DB] dark:border-[#2B2B2B] h-9 text-sm"
        >
            + Add new question
        </Button>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-[#FCFCFD] dark:bg-dark-2 rounded-md min-h-130 p-6 border border-[#D6D9DB] dark:border-[#2B2B2B]">
          <div className="mb-6 flex items-start gap-2">
            <span className="text-1xl font-bold mt-2">{currentQuestion + 1}.</span>
            <Input
              type="text"
              value={questions[currentQuestion].text}
              onChange={(e) => updateQuestionText(e.target.value)}
              placeholder="Enter your question"
              className="font-bold dark:bg-dark-2 dark:border-dark-3 rounded-b-none p-0 border-b-dark-3 border border-x-0 border-t-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent flex-1"
            />
          </div>

          <div className="flex flex-col gap-3">
            {questions[currentQuestion].answers.map((answer, index) => (
              <div
                key={answer.id}
                className="flex items-center gap-3 bg-[#FCFCFD] dark:bg-[#2B2B2B] rounded-md p-2 px-4 border border-[#D6D9DB] dark:border-[#2B2B2B]"
              >
                <span className="text-lg font-medium">
                  {String.fromCharCode(97 + index)}.
                </span>
                <Input
                  type="text"
                  value={answer.text}
                  onChange={(e) => updateAnswerText(answer.id, e.target.value)}
                  placeholder="Enter choice"
                  className="font-bold dark:bg-dark-3 dark:border-dark-3 p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent flex-1"
                />
                <button
                  onClick={() => removeAnswer(answer.id)}
                  className="text-gray-500 hover:text-red-500 cursor-pointer text-2xl"
                >
                  ×
                </button>
              </div>
            ))}

            <Button
              variant="outline"
              onClick={addNewAnswer}
              className="justify-start cursor-pointer bg-[#FCFCFD] dark:bg-[#2B2B2B] hover:bg-[#D6D9DB] dark:hover:bg-[#3B3B3B] border-[#D6D9DB] dark:border-[#2B2B2B] h-12 text-base"
            >
              + Add new choice
            </Button>
          </div>
        </div>
      </section>
    </UserLayout>
  );
}