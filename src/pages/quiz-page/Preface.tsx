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

interface PrefaceProps{
    id: string;
    startQuiz: () => void;
}

export default function Preface({id, startQuiz} : PrefaceProps){
    const axiosPrivate = useAxiosPrivate();
    
    const {quizData, fetchQuizData} = useQuizContext();
    const [owner, setOwner] = useState("n/a");
    const navigate = useNavigate();

    useEffect(() => {
        fetchQuizData(id);
    }, [id])

    useEffect(() => {
        
        if(!quizData) return;

        const getOwner = async () => {
            try{
                const getNote = await axiosPrivate.get(`/notes/${quizData.note}`);
                setOwner(getNote.data.creator.username);
            }catch(err){
                console.error(err);
            }
        }
        getOwner();
    }, [quizData])

    

    const review = () => {
        navigate(`/notes/${quizData.note}`);
    }

    return (
        <div className="w-full h-[80vh] flex justify-center items-center">
            <div className="min-h-50 border min-w-120 max-w-120 border-light-3 p-4 rounded-md flex flex-col justify-center">
                <h3 className="text-sm text-dark-border">{quizData.questions.length} Questions</h3>
                <h1 className="text-2xl font-bold">{quizData.quizTitle}</h1>
                <h2>Created by {(owner)}</h2>
                <p className="text-dark-border text-sm">{quizData.description}</p>
                <div className="flex w-full mt-6 justify-end  gap-2">
                    <Button onClick={review} variant={"outline"} className="">View Original Note</Button>
                    <Button onClick={startQuiz} className="">Take Quiz</Button>
                </div>

            </div>
        </div>
        
    );
}