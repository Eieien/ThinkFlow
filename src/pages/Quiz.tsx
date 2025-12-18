import UserLayout from "@/components/layout/User/UserLayout";
import {useState, useEffect} from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {ArrowRight, ArrowLeft} from "lucide-react"


export default function Quiz(){

    // A local part where these are the details of the quiz
    const quizData = {
        title: "Data Structures Quiz",
        timeLimit: { hours: 0, minutes: 3 }, // Creator sets this
        questions: [
            { id: 1, text: "What is needed for a linked list?", options: ["Node and pointer", "Array and index", "Stack and queue", "Hash and key"]},
            { id: 2, text: "What is needed for a list?", options: ["O(log n)", "O(n)", "O(n²)", "O(1)"]},
            { id: 3, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 4, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 5, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 6, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 7, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 8, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 9, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
            { id: 10, text: "What is needed for a linked?", options: ["Stack", "Queue", "Tree", "Graph"]},
        ]
    };

    // Current question index
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // Track answered questions and selected answers
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [selectedAnswers, setSelectedAnswers] = useState({});

    // Your previous code Joe but it is changed to the progress of the user when it the question is answered
    const progress = (answeredQuestions.size / quizData.questions.length) * 100;

    //A code for a timer shown when started
    const totalTimeInSeconds = (quizData.timeLimit.hours * 3600) + (quizData.timeLimit.minutes * 60);
    const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    // Navigation functions
    const goToNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Function to mark question as answered
    const markAsAnswered = (questionId: number, optionIndex: number) => {
        setAnsweredQuestions(prev => new Set([...prev, questionId]));
        setSelectedAnswers(prev => ({
        ...prev,
        [questionId]: optionIndex
        }));
    };

    const currentQuestion = quizData.questions[currentQuestionIndex];

    return (
        <UserLayout title="Quiz Page" description="Quiz">
        <h3 className="text-gray-900 text-xl font-bold mb-5 dark:text-primary-white">
            {quizData.title}
        </h3>

        <section className="w-full flex justify-between gap-2">
            <div className="flex flex-col gap-3 w-full mr-5">
            <Progress value={progress} className="h-5" />
            <h1 className="text-lg font-medium">
                {currentQuestionIndex + 1}. {currentQuestion.text}
            </h1>
            {currentQuestion.options.map((option, index) => (
                <Button
                key={index}
                variant="outline"
                onClick={() => markAsAnswered(currentQuestion.id, index)}
                className={
                    selectedAnswers[currentQuestion.id] === index
                    ? "text-white bg-light-primary-blue hover:bg-light-primary-blue hover:text-white dark:bg-dark-primary-blue dark:hover:bg-dark-primary-blue cursor-pointer"
                    : "cursor-pointer"
                }
                >
                {option}
                </Button>
            ))}
            <div className="flex justify-center gap-3 items-center">
                <button
                onClick={goToPreviousQuestion}
                disabled={currentQuestionIndex === 0}
                className="disabled:opacity-30 disabled:cursor-not-allowed"
                >
                <ArrowLeft className="cursor-pointer" />
                </button>
                <div className="font-bold">
                {currentQuestionIndex + 1}/{quizData.questions.length}
                </div>
                <button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === quizData.questions.length - 1}
                className="disabled:opacity-30 disabled:cursor-not-allowed"
                >
                <ArrowRight className="cursor-pointer" />
                </button>
            </div>
            </div>
            <div className="flex flex-col gap-2 w-90">
                <div className="border border-gray-300 rounded-md p-2 h-40 flex flex-col items-center justify-center">
                <p className="text-gray-600 text-base">Time</p>
                <h1 className="font-bold text-2xl">{formatTime(timeLeft)}</h1>
                </div>

                {
                    //The Scroll Bar of the Answered or Unaswered Questions
                }
                <div className="flex flex-col gap-2 h-[calc(100vh-500px)] min-h-[300px] max-h-[600px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-primary-dark [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-primary-dark 
                dark:[&::-webkit-scrollbar-thumb]:bg-primary-white dark:[&::-webkit-scrollbar-thumb]:hover:bg-primary-white dark:[&::-webkit-scrollbar-track]:bg-dark-3">
                {quizData.questions.map((question, index) => (
                <Button
                    key={question.id}
                    variant="outline"
                    onClick={() => setCurrentQuestionIndex(index)}
                    className={
                    answeredQuestions.has(question.id)
                        ? "bg-light-primary-blue hover:bg-light-primary-blue text-primary-white hover:text-primary-white dark:bg-dark-primary-blue dark:hover:bg-dark-primary-blue dark:hover:text-primary-white cursor-pointer"
                        : "cursor-pointer"
                    }
                >
                    Q{index + 1}: {answeredQuestions.has(question.id) ? "Answered" : "Unanswered"}
                </Button>
                ))}
            </div>
            </div>
        </section>
        </UserLayout>
  );
}