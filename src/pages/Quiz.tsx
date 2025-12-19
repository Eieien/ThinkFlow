import UserLayout from "@/components/layout/User/UserLayout";
import {useState, useEffect} from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useParams } from "react-router-dom";
import type { Quiz } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { QuizProvider } from "@/context/QuizProvider";
import Test from "./quiz-page/Test";
import Preface from "./quiz-page/Preface";
import Results from "./quiz-page/Results";

export default function Quiz(){
    const {id} = useParams();
    const [answering, isAnswering] = useState(false);
    const [finished, isFinished] = useState(false);
    const [quizData, setQuizData] = useState<Quiz>(
        {
            _id: "",
            note: "",
            quizTitle: "",
            description: "",
            questions: [],
            createdAt: "",
            updatedAt: "", 
        }
    );

    const startQuiz = () => {
        isAnswering(true);
    }

    const submitQuiz = () => {
        isFinished(true);
        isAnswering(false);
    }

    const retakeQuiz = () => {
        isAnswering(true);
        isFinished(false);
    }

    return (
        <QuizProvider>
            <UserLayout title="Quiz Page" description="Quiz">
                {!answering && !finished && <Preface id={String(id)} startQuiz={startQuiz}/>}
                
                {answering && !finished && <Test id={String(id)} submitQuiz={submitQuiz}/>}
                
                {!answering && finished && <Results id={String(id)} retakeQuiz={retakeQuiz}/>}
                                
            </UserLayout>
        </QuizProvider>
        
    );
}