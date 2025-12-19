import UserLayout from "@/components/layout/User/UserLayout";
import {useState, useEffect} from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import type { Quiz } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { QuizProvider } from "@/context/QuizProvider";
import { useQuizContext } from "@/hooks/useQuizContext";
import { useDataContext } from "@/hooks/useDataContext";

interface ResultsProps{
    id: string;
    retakeQuiz: () => void;
}

export default function Results({id, retakeQuiz} : ResultsProps){
    const axiosPrivate = useAxiosPrivate();
    
    const {score, quizData, fetchQuizData} = useQuizContext();
    const navigate = useNavigate();
    const viewOtherQuizzes = () => {
        navigate('/explore');
    }

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="min-h-50 border min-w-120 max-w-120 border-light-3 p-4 rounded-md flex flex-col gap-2 justify-center">
                <p className="text-dark-border text-center">Total Score</p>
                <h1 className="text-center text-2xl font-bold">{`${score}/${quizData.questions.length}`}</h1>
                <div className="flex gap-2 justify-center items-center">
                    <Button onClick={viewOtherQuizzes} variant={"outline"}>View Other Quizzes</Button>
                    <Button onClick={retakeQuiz}>Retake Quiz</Button>

                </div>
                
            </div>
        </div>
        
    );
}