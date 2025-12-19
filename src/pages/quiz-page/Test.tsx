import UserLayout from "@/components/layout/User/UserLayout";
import {useState, useEffect} from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Quiz } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { QuizProvider } from "@/context/QuizProvider";
import { useQuizContext } from "@/hooks/useQuizContext";

interface InQuizProps{
    id: string;
    submitQuiz: () => void;
}

export default function InQuiz({id, submitQuiz} : InQuizProps){
    const axiosPrivate = useAxiosPrivate();
    const {quizData, setQuizData} = useQuizContext();
    
   

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
    const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'a' | 'b' | 'c' | 'd'>>({});
    const {score, setScore} = useQuizContext();
    const progress = (answeredQuestions.size / quizData.questions.length) * 100;

    useEffect(() => {
        let correctCount = 0;
        quizData.questions.forEach(question => {
            if (selectedAnswers[question._id] === question.answer) {
                correctCount++;
            }
        });
        setScore(correctCount);
    }, [selectedAnswers, quizData.questions]);

    const goToNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }else{
            submitQuiz();
        }
    };

    const goToPreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    const markAsAnswered = (questionId: string, optionKey: 'a' | 'b' | 'c' | 'd') => {
        if (answeredQuestions.has(questionId)) {
            return;
        }
        
        setAnsweredQuestions(prev => new Set([...prev, questionId]));
        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: optionKey
        }));
    };

    const currentQuestion = quizData.questions[currentQuestionIndex];

    if (!currentQuestion) {
        return (
            <div className="text-center py-10">
                <p>Loading quiz...</p>
            </div>
        );
    }

    const optionsArray = [
        { key: 'a' as const, value: currentQuestion.options.a },
        { key: 'b' as const, value: currentQuestion.options.b },
        { key: 'c' as const, value: currentQuestion.options.c },
        { key: 'd' as const, value: currentQuestion.options.d },
    ];

    const isAnswered = answeredQuestions.has(currentQuestion._id);
    const userAnswer = selectedAnswers[currentQuestion._id];
    const correctAnswer = currentQuestion.answer;

    const getButtonStyle = (optionKey: string) => {
        if (!isAnswered) {
            return "cursor-pointer";
        }

        const isCorrect = optionKey === correctAnswer;
        const isSelected = optionKey === userAnswer;

        if (isCorrect) {
            return "bg-green-500 hover:bg-green-500 text-white hover:text-white dark:bg-green-600 dark:hover:bg-green-600 cursor-not-allowed";
        } else if (isSelected) {
            return "bg-red-500 hover:bg-red-500 text-white hover:text-white dark:bg-red-600 dark:hover:bg-red-600 cursor-not-allowed";
        } else {
            return "opacity-50 cursor-not-allowed";
        }
    };

    return (
        <>
                <h3 className="text-gray-900 text-xl font-bold mb-5 dark:text-primary-white">
                    {quizData.quizTitle}
                </h3>

                <section className="w-full flex justify-between gap-2">
                    <div className="flex flex-col gap-3 w-full mr-5">
                        <Progress value={progress} className="h-5" />
                        <h1 className="text-lg font-medium">
                            {currentQuestionIndex + 1}. {currentQuestion.question}
                        </h1>
                        
                        {optionsArray.map((option) => {
                            const isCorrect = option.key === correctAnswer;
                            const isSelected = option.key === userAnswer;
                            
                            return (
                                <Button
                                    key={option.key}
                                    variant="outline"
                                    onClick={() => markAsAnswered(currentQuestion._id, option.key)}
                                    disabled={isAnswered}
                                    className={getButtonStyle(option.key)}
                                >
                                    <div className="flex items-center justify-between w-full">
                                        <span>{option.key.toUpperCase()}. {option.value}</span>
                                        {isAnswered && isCorrect && <Check className="h-5 w-5" />}
                                        {isAnswered && isSelected && !isCorrect && <X className="h-5 w-5" />}
                                    </div>
                                </Button>
                            );
                        })}

                        {isAnswered && currentQuestion.explaination && (
                            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                                <h3 className="font-semibold mb-2">Explanation:</h3>
                                <p className="text-sm">{currentQuestion.explaination}</p>
                            </div>
                        )}

                        <div className="flex justify-end gap-3 items-center">
                            <Button onClick={goToPreviousQuestion} disabled={currentQuestionIndex === 0}>
                                Previous
                            </Button>
                            <Button onClick={goToNextQuestion}>
                                {currentQuestionIndex === quizData.questions.length - 1 ? "Submit" : "Next"}
                            </Button>
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 w-90">
                        {/* Score Display */}
                        <div className="border border-gray-300 rounded-md p-4 flex flex-col items-center justify-center">
                            <p className="text-gray-600 dark:text-gray-400 text-sm">Score</p>
                            <h1 className="font-bold text-2xl">{score} / {quizData.questions.length}</h1>
                        </div>

                        <div className="flex flex-col gap-2 h-[calc(100vh-500px)] min-h-[300px] max-h-[600px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-2 ">
                            {quizData.questions.map((question, index) => {
                                const isAnswered = answeredQuestions.has(question._id);
                                const isCurrent = index === currentQuestionIndex;
                                const isCorrect = isAnswered && selectedAnswers[question._id] === question.answer;
                                
                                return (
                                    <Button
                                        key={question._id}
                                        variant="outline"
                                        onClick={() => setCurrentQuestionIndex(index)}
                                        className={`
                                            relative transition-all
                                            ${isCurrent 
                                                ? "ring-2 ring-light-primary-blue dark:ring-dark-primary-blue shadow-lg" 
                                                : ""
                                            }
                                            ${isAnswered && isCorrect
                                                ? "bg-green-500 hover:bg-green-600 text-white hover:text-white dark:bg-green-600 dark:hover:bg-green-700"
                                                : isAnswered && !isCorrect
                                                ? "bg-red-500 hover:bg-red-600 text-white hover:text-white dark:bg-red-600 dark:hover:bg-red-700"
                                                : !isAnswered && isCurrent
                                                ? ""
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800"
                                            }
                                            cursor-pointer
                                        `}
                                    >
                                        <div className="flex items-center justify-between w-full">
                                            <span className="font-medium">Q{index + 1}</span>
                                            <div className="flex items-center gap-2">
                                                {isAnswered ? (
                                                    <>
                                                        {isCorrect ? (
                                                            <>
                                                                <Check className="h-4 w-4" />
                                                                <span className="text-xs">Correct</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <X className="h-4 w-4" />
                                                                <span className="text-xs">Wrong</span>
                                                            </>
                                                        )}
                                                    </>
                                                ) : (
                                                    <span className="text-xs opacity-60">Unanswered</span>
                                                )}
                                            </div>
                                        </div>
                                        {isCurrent && (
                                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-3/4 bg-light-primary-blue dark:bg-dark-primary-blue rounded-r" />
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    </div>
                </section>
        </>
        
    );
}