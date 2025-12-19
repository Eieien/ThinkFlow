import type { Quiz } from "@/configs/DataTypeConfig";
import {Bookmark} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NotesCardProps{
    quiz: Quiz,
}

export default function NotesCard({quiz} : NotesCardProps){

    const navigate = useNavigate();

    const lastEdited = new Date(quiz.updatedAt);
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' }

    return (
        <div className="w-full card hover:bg-light-2 transition cursor-pointer break-words" onClick={() => navigate(`/quiz/${quiz._id}`)}>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold ">{quiz.quizTitle}</h1>
                <h3 className="text-dark-border text-sm dark:text-light-border">{lastEdited.toLocaleDateString('en-US', options)}</h3>
            </div>
            <div className="flex gap-1">
                <div className="px-2.5 py-0.5 border border-light-border rounded-full">
                    wuwa
                </div>
            </div>
            <h2 className="text-dark-4 break-words">
                {quiz.description}
            </h2>

        </div>
    )
}