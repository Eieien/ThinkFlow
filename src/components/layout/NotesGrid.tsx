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
    type:  string;
    className?: String;
    source: string;
}

interface DataState{
    notes: Note[];
    quizzes: Quiz[];
}

export default function NotesGrid( {type, className = "grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ", source = "owned" 
} :  NotesGridProps){

    const [data, setData] = useState<DataState>({
        notes: [],
        quizzes: [],
    })

    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const navigate = useNavigate();

    const {userNotes,userQuizzes, globalNotes, globalQuizzes, bookmarks} = useDataContext();

    useEffect(() => {
        console.log(userQuizzes);
    }, [userQuizzes])

    const getNotesData = () => {
        if (source === "owned") return userNotes;
        if (source === "bookmarks") return bookmarks;
        if (source === "global") return globalNotes;
        return [];
    };

    const getQuizzesData = () => {
        if (source === "owned") return userQuizzes;
        if (source === "global") return globalQuizzes;
        return [];
    };

    const displayNotes = type === "Notes" ? getNotesData() : [];
    const displayQuizzes = type === "Quizzes" ? getQuizzesData() : [];

    return (
        <>
            {type === "Notes" ? (
                <section className={String(className)}>
                    {displayNotes.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            {source === "owned" && "No notes found"}
                            {source === "bookmarks" && "No bookmarked notes found"}
                            {source === "global" && "No global notes available"}
                        </p>
                    ) : (
                        displayNotes.map((note) => (
                            <NotesCard
                                key={note._id}
                                note={note}
                                tag="Prog II"
                                navigate={() => navigate(`/notes/${note._id}`)}
                            />
                        ))
                    )}
                </section>
            ) : (
                <section className={String(className)}>
                    {displayQuizzes.length === 0 ? (
                        <p className="text-gray-500 text-sm">
                            {source === "owned" && "No quizzes found"}
                            {source === "global" && "No global quizzes available"}
                        </p>
                    ) : (
                        displayQuizzes.map((quiz) => (
                            <QuizCard
                                key={quiz._id}
                                quiz={quiz}
                            />
                        ))
                    )}
                </section>
            )}
        </>
    );
}
