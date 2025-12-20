import UserLayout from "@/components/layout/User/UserLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Quiz, Questions } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDataContext } from "@/hooks/useDataContext";
import axios from "axios";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function QuizCreator() {
    const axiosPrivate = useAxiosPrivate();
    const {id} = useParams();
    const navigate = useNavigate();
    const {globalQuizzes} = useDataContext();
    const [showDetails, setShowDetails] = useState(true);
    const [quizData, setQuizData] = useState<Quiz>({
        _id: "",
        note: "",
        quizTitle: "",
        description: "",
        questions: [],
        createdAt: "",
        updatedAt: "", 
    });

    const [currentQuestion, setCurrentQuestion] = useState(0);

    const fetchQuizData = async () => {
        try {
            const fetchedQuiz = await axiosPrivate.get(`/quizzes/${id}`);
            setQuizData(fetchedQuiz.data);
            console.log(fetchedQuiz.data);
        } catch(err) {
            console.error(err);
        }
    } 
    useEffect(() => {
        fetchQuizData();
    }, [id]);

    const handleUpdate = async () => {
      try{
        console.log(quizData.questions);
        const res = await axiosPrivate.put(`/quizzes/${id}`, {
          quizTitle: quizData.quizTitle,
          description: quizData.description,
          questions: quizData.questions,
        });
        console.log(res.data.editedQuiz.questions);
      }catch(err){
        console.error(err);
      }
    }

    const handlePublish = () => {
      handleUpdate();
      navigate(`/quiz/${id}`);
    }

    const handleDelete = async () => {
      try{
        const res = await axiosPrivate.delete(`/quizzes/${id}`);
        console.log(res.status);

        navigate(`/notes/${quizData.note}`);

      }catch(err){
        console.error(err);
      }
    }

    const addNewQuestion = async () => {
        const newQuestion: Questions = {
            _id: `temp-${Date.now()}`, 
            question: "a",
            options: { a: "d", b: "d", c: "d", d: "d" },
            answer: "a",
            explaination: "s",
        };

        const res = await axiosPrivate.post(`/quizzes/question`, {
            quizId: quizData._id,
            question: {
                options: newQuestion.options,
                question: newQuestion.question,
                answer: newQuestion.answer,
                explaination: newQuestion.explaination
            }
        })
       
        console.log(res.data);
        
        setQuizData(prev => ({
            ...prev,
            questions: [...prev.questions, res.data]
        }));

        fetchQuizData();

    };

    const deleteQuestion = (questionId: string) => {
        if (quizData.questions.length === 1) return;
        
        const updatedQuestions = quizData.questions.filter((q) => q._id !== questionId);
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
        
        if (currentQuestion >= updatedQuestions.length) {
            setCurrentQuestion(updatedQuestions.length - 1);
        }
        handleUpdate();

    };

    const updateQuestionText = (text: string) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[currentQuestion].question = text;
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const updateOptionText = (optionKey: 'a' | 'b' | 'c' | 'd', text: string) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[currentQuestion].options[optionKey] = text;
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const updateCorrectAnswer = (optionKey: 'a' | 'b' | 'c' | 'd') => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[currentQuestion].answer = optionKey;
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

    const updateQuizTitle = (title: string) => {
      setQuizData(prev => ({ ...prev, quizTitle: title }));
    };

    const updateQuizDescription = (description: string) => {
        setQuizData(prev => ({ ...prev, description: description }));
    };


    const updateExplanation = (text: string) => {
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[currentQuestion].explaination = text;
        setQuizData(prev => ({ ...prev, questions: updatedQuestions }));
    };

   

    if (quizData.questions.length === 0) {
        return (
            <UserLayout title="Quiz Creator" description="Create your quiz">
                <div className="text-center py-10">
                    <p>Loading quiz...</p>
                </div>
            </UserLayout>
        );
    }

    const currentQ = quizData.questions[currentQuestion];
    const options: Array<{ key: 'a' | 'b' | 'c' | 'd', label: string }> = [
        { key: 'a', label: 'a' },
        { key: 'b', label: 'b' },
        { key: 'c', label: 'c' },
        { key: 'd', label: 'd' },
    ];

    return (
      <UserLayout title="Quiz Creator" description="Create your quiz">
        <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white mb-5">
            {quizData.quizTitle || "Untitled Quiz"}
        </h3>

        <section className="w-full flex justify-between gap-4">
            {/* Left Sidebar */}
            <div className="flex flex-col gap-2 w-64">
                <Button 
                    onClick={handlePublish}
                    className="w-full cursor-pointer bg-[#492AE5] hover:bg-[#3d23c4] text-white h-9"
                >
                    Publish Quiz
                </Button>

                {/* Details Button */}
                <Button
                    variant="outline"
                    onClick={() => setShowDetails(true)}
                    className={`w-full justify-start cursor-pointer h-9 text-sm ${
                        showDetails ? "bg-gray-100 dark:bg-[#1A1A1A]" : ""
                    }`}
                >
                    <Pen/>Quiz Details
                </Button>

                <div className="flex flex-col gap-2 max-h-[400px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-2 
                [&::-webkit-scrollbar-track]:bg-gray-200 [&::-webkit-scrollbar-track]:rounded [&::-webkit-scrollbar-thumb]:bg-primary-dark [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:hover:bg-primary-dark 
                dark:[&::-webkit-scrollbar-thumb]:bg-primary-white dark:[&::-webkit-scrollbar-thumb]:hover:bg-primary-white dark:[&::-webkit-scrollbar-track]:bg-dark-3">
                    {quizData.questions.map((question, index) => (
                        <div key={question._id} className="relative">
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setShowDetails(false);
                                    setCurrentQuestion(index);
                                }}
                                className={`w-full justify-start cursor-pointer h-9 text-sm ${
                                    !showDetails && currentQuestion === index
                                        ? "bg-gray-100 dark:bg-[#1A1A1A]"
                                        : ""
                                }`}
                            >
                                <span className="truncate mr-2">
                                    Question {index + 1}{question.question ? `: ${question.question}` : ": Untitled"}
                                </span>
                            </Button>
                            {quizData.questions.length > 1 && (
                                <button
                                    onClick={() => deleteQuestion(question._id)}
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
                {showDetails ? (
                    // Quiz Details View
                    <div className="flex flex-col gap-6">
                        <h2 className="text-2xl font-bold">Quiz Details</h2>
                        <div>
                            <label className="block text-sm font-medium mb-2">Quiz Title</label>
                            <Input
                                type="text"
                                value={quizData.quizTitle}
                                onChange={(e) => updateQuizTitle(e.target.value)}
                                placeholder="Enter quiz title"
                                className="dark:bg-dark-3 dark:border-dark-3"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Description</label>
                            <Textarea
                                value={quizData.description}
                                onChange={(e) => updateQuizDescription(e.target.value)}
                                placeholder="Enter quiz description"
                                className="dark:bg-dark-3 dark:border-dark-3 min-h-[150px]"
                            />
                        </div>

                        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md border border-blue-200 dark:border-blue-800">
                            <p className="text-sm">
                                <strong>Total Questions:</strong> {quizData.questions.length}
                            </p>
                        </div>
                        <div className="flex items-center gap-2 justify-end">

                          <Button onClick={handleDelete} className="border-light-error border text-light-error bg-primary-light hover:bg-red-100 hover:dark:bg-red-950 dark:bg-primary-dark">Delete Note</Button>
                          <Button onClick={handleUpdate} className="bg-light-primary-blue hover:bg-blue-600 text-primary-white">Save Changes</Button>
                        </div>
                    </div>
                ) : (
                    // Question Editor View
                    <>
                        <div className="mb-6 flex items-start gap-2">
                            <span className="text-1xl font-bold mt-2">{currentQuestion + 1}.</span>
                            <Input
                                type="text"
                                value={currentQ.question}
                                onChange={(e) => updateQuestionText(e.target.value)}
                                placeholder="Enter your question"
                                className="font-bold dark:bg-dark-2 dark:border-dark-3 rounded-b-none p-0 border-b-dark-3 border border-x-0 border-t-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent flex-1"
                            />
                        </div>

                        <div className="flex flex-col gap-3">
                            {options.map((option) => (
                                <div
                                    key={option.key}
                                    className="flex items-center gap-3 bg-[#FCFCFD] dark:bg-[#2B2B2B] rounded-md p-2 px-4 border border-[#D6D9DB] dark:border-[#2B2B2B]"
                                >
                                    <input
                                        type="radio"
                                        name="correct-answer"
                                        checked={currentQ.answer === option.key}
                                        onChange={() => updateCorrectAnswer(option.key)}
                                        className="cursor-pointer"
                                    />
                                    <span className="text-lg font-medium">{option.label}.</span>
                                    <Input
                                        type="text"
                                        value={currentQ.options[option.key]}
                                        onChange={(e) => updateOptionText(option.key, e.target.value)}
                                        placeholder="Enter choice"
                                        className="font-bold dark:bg-dark-3 dark:border-dark-3 p-0 border-none focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent flex-1"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-medium mb-2">Explanation (optional)</label>
                            <Input
                                type="text"
                                value={currentQ.explaination}
                                onChange={(e) => updateExplanation(e.target.value)}
                                placeholder="Enter explanation for the correct answer"
                                className="dark:bg-dark-3 dark:border-dark-3"
                            />
                        </div>
                    </>
                )}
            </div>
        </section>
    </UserLayout>
    );
}