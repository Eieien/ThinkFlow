import NotesCard from "@/components/NotesCard";
import QuizCard from "@/components/QuizCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import type { Note, Quiz } from "@/configs/DataTypeConfig";
import axiosPublic from "@/api/axiosInstances";
import useAuth from "@/hooks/useAuth";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Navigate, useNavigate } from "react-router-dom";
import { useDataContext } from "@/hooks/useDataContext";

interface NotesGridProps{
    type: String;
    className?: String;
    ownedNotes?: boolean;
}

interface DataState{
    notes: Note[];
    quizzes: Quiz[];
}

export default function NotesGrid( {type, className = "grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ", ownedNotes = false} :  NotesGridProps){

    const [data, setData] = useState<DataState>({
        notes: [],
        quizzes: [],
    })

    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const {userNotes, globalNotes, globalQuizzes} = useDataContext();

    // useEffect(() => {
    //     const isLoggedIn = Boolean(auth.user?._id);
    //     // if(!auth)return;
    //     const getNotes = async () => {
    //         try{
                
    //             if(isLoggedIn && ownedNotes){
    //                 setData((prev) => ({...prev, notes: userNotes}));

    //             }else{
    //                 const getNotes = await axiosPublic.get('/notes/');
    //                 console.log(getNotes.data);
    //                 const getQuizzes = await axiosPublic.get('/quizzes/');
    //                 setData((prev) => ({...prev, notes: getNotes.data, quizzes: getQuizzes.data}));
    //             }

    //         }catch(err){
    //             if(err instanceof AxiosError){
    //                 console.log(err?.response?.data);
    //             } else {
    //                 console.log(err);
    //             }
    //         }
    //     }
    //     getNotes();
    // }, [auth, userNotes])

    return (
        <>
            {type === "Notes" ? (
                <section className={String(className)}>
                    {userNotes.length === 0 ? (
                    <p className="text-gray-500 text-sm">No notes found</p>
                    ) : (
                        userNotes.map((note) => (
                        <NotesCard
                            key={note._id}
                            title={note.title}
                            note={note}
                            noOfBookmarked="10"
                            dateCreated={note.creator.createdAt}
                            creator={note.creator.username}
                            tag="Prog II"
                            description={note.description}
                            navigate ={() => navigate(`/notes/${note._id}`)}
                        />
                    ))
                    )}
                </section>
                ) : (
                <section className={String(className)}>
                    {globalQuizzes.length === 0 ? (
                    <p className="text-gray-500 text-sm">No quizzes found</p>
                    ) : (
                    data.quizzes.map((quiz) => (
                        <QuizCard
                        key={quiz._id}
                        title={quiz.quizTitle}
                        noOfBookmarked="10"
                        noOfQuestions={quiz.questions.length}
                        creator={quiz._id}
                        tag="Prog II"
                        description={quiz.description}
                        />
                    ))
                )}
                </section>
            )}

            
        </>
    )
}
