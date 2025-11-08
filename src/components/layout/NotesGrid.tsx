import NotesCard from "@/components/NotesCard";
import QuizCard from "@/components/QuizCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import type { Note, Quiz } from "@/configs/DataTypeConfig";

interface NotesGridProps{
    type: String;
    className?: String;
}

interface DataState{
    notes: Note[];
    quizzes: Quiz[];
}

export default function NotesGrid( {type, className = "grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 "} :  NotesGridProps){

    const [data, setData] = useState<DataState>({
        notes: [],
        quizzes: [],
    })

    const axiosInstance = axios.create({
        baseURL: 'http://localhost:3000/api/',
    });
    useEffect(() => {
        // imma try catch this later
        const getNotes = async () => {
            try{
                const getNotes = await axiosInstance.get('/notes/');
                const getQuizzes = await axiosInstance.get("/quizzes");
                setData((prev) => ({...prev, notes: getNotes.data, quizzes: getQuizzes.data}));
            }catch(err){
                if(err instanceof AxiosError){
                    console.log(err?.response?.data);
                } else {
                    console.log(err);
                }
            }
        }
        getNotes();
    }, [])

    return (
        <>
            {type == "Notes" ? 
                <section className={String(className)}>
                    {data.notes.map((note) => (
                        <NotesCard key={note._id}
                        title={note.title}
                        noOfBookmarked="10"
                        dateCreated={note.creator.createdAt}
                        creator={note.creator.username}
                        tag="Prog II"
                        description={note.description}
                        />
                    ))}
                </section>
                :
                <section className={String(className)}>
                    {data.quizzes.map((quiz) => (
                        <QuizCard
                            title={quiz.quizTitle}
                            noOfBookmarked="10"
                            noOfQuestions={quiz.questions.length}
                            creator={quiz._id}
                            tag="Prog II"
                            description={quiz.description}
                        />
                    ))}
            </section>
            }
            
        </>
    )
}
