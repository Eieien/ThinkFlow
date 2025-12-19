import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import NotesCard from "@/components/NotesCard";
import QuizCard from "@/components/QuizCard";
import Layout from "@/components/layout/Layout";
import NavigationBar from "@/components/layout/NavigationBar"
import ian from "@/assets/images/Ian.jpg"
import NotesGrid from "@/components/layout/NotesGrid";
import { useCardType } from "@/hooks/useCardType"
import UserLayout from "@/components/layout/User/UserLayout";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Users, Note, Quiz } from "@/configs/DataTypeConfig";
import axiosPublic from "@/api/axiosInstances";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Notebook, Pen } from "lucide-react";

interface SocialLink {
    id: number;
    platform: string;
    url: string;
}

export default function Profile() {
    const { cardType, notes, quizzes } = useCardType();
    const { id } = useParams();
    const [fetchedNotes, setfetchedNotes] = useState<Note[]>([]);
    const [userExists, setUserExists] = useState(true);
    const [fetchedQuizzes, setfetchedQuizzes] = useState<Quiz[]>([]);
    const [userData, setUserData] = useState<Users>({
        _id: "",
        username: "",
        email: "",
        createdAt: "",
        updatedAt: "",
        deactivated: false
    })
    const navigate = useNavigate();
    const axiosPrivate = useAxiosPrivate();
    
    useEffect(() => {

        const fetchUserData = async () => {
            try{
                const notes = await axiosPrivate.get(`/notes/user/${id}`);
                const quizzes = await axiosPrivate.get(`/quizzes/user/${id}`);
                const user = await axiosPrivate.get(`/users/${id}`);
                setUserData(user.data);
                setfetchedNotes(notes.data);
                setfetchedQuizzes(quizzes.data);
                setUserExists(true);

            }catch(err){
                setUserExists(false);
                console.log("No user found");
            }
        }
        fetchUserData();

    }, [id])



    if(!userExists){
        return(
            <UserLayout
            title="User not found"
            description="User not found">
                <div className="flex w-full h-[90%]">
                    <h1 className="text-2xl">User not found!</h1>
                </div>

            </UserLayout>
        )
    }

    return (
        <>
            <UserLayout
                title="Profile"
                description='Yez'
            >   
                

                <section className="flex max-w-350 gap-1 mb-8 p-8 border border-light-4 dark:border-dark-3 rounded-md relative">
                    <div className="flex gap-2 justify-between">
                        <Avatar className="w-30 h-30 ">
                            <AvatarImage src={ian} alt="User" className="object-cover" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl">{userData.username}</h1>
                            <h1 className="text-xl">{userData.email}</h1>
                            <h1 className="text-sm">{userData.createdAt}</h1>
                        </div>
                    </div>
                
                </section>
                
                <div className="flex gap-2 mb-2">
                    <button onClick={notes} className="user-buttons">
                        <Notebook className="w-5 h-5"/>
                        <span>Notes</span>
                    </button>
                    <button onClick={quizzes} className="user-buttons">
                        <Pen className="w-5 h-5"/>
                        <span>Quiz</span>
                        
                    </button>

                </div>

                {cardType === "Notes" ? (
                    <section className="grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {fetchedNotes.length === 0 ? (
                            <p className="text-gray-500 text-sm">
                                no notes found
                            </p>
                        ) : (
                            fetchedNotes.map((note) => (
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
                        <section className="grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                            {fetchedQuizzes.length === 0 ? (
                                <p className="text-gray-500 text-sm">
                                    no quizzes found
                                </p>
                            ) : (
                                fetchedQuizzes.map((quiz) => (
                                    <QuizCard
                                        key={quiz._id}
                                        quiz={quiz}
                                    />
                                ))
                            )}
                    </section>
                )}
            </UserLayout>
        </>
    )
}