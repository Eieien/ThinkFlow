import type { Quiz } from "@/configs/DataTypeConfig";
import {Bookmark, MoreVertical} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import axios from "axios";
import { useDataContext } from "@/hooks/useDataContext";

interface NotesCardProps{
    quiz: Quiz,
}

export default function NotesCard({quiz} : NotesCardProps){

    const navigate = useNavigate();

    const lastEdited = new Date(quiz.updatedAt);
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' }
    const {setGlobalQuizzes, updateQuizzes} = useDataContext(); 
    const axiosPrivate = useAxiosPrivate();

    const deleteQuiz = async (quizId: string) => {
        try{
            console.log(quizId);
            setGlobalQuizzes(prev => prev.filter(quiz => quiz._id !== quizId));
            const res = await axiosPrivate.delete(`/quizzes/${quizId}`);
            updateQuizzes();
            console.log(res.data);
        }catch(err){
            console.error(err);
        }
    }

    return (
        <div className="w-full card hover:bg-light-2 transition cursor-pointer break-words" onClick={() => navigate(`/quiz/${quiz._id}`)}>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold ">{quiz.quizTitle}</h1>
                <div className="flex ">
                    <h3 className="text-dark-border text-sm dark:text-light-border">{lastEdited.toLocaleDateString('en-US', options)}</h3>
                    <div onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <MoreVertical/>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onClick={() => navigate(`/quiz-settings/${quiz._id}`)}>
                                    <span>Edit</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => deleteQuiz(quiz._id)}>
                                    <span>Delete</span>
                                </DropdownMenuItem>

                            </DropdownMenuContent>
                        </DropdownMenu>
                
                    </div>
                </div>
            </div>
            <div className="flex gap-1">
                
            </div>
            <h2 className="text-dark-4 break-words">
                {quiz.description}
            </h2>

        </div>
    )
}