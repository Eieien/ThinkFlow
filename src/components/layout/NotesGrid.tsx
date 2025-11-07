import react from "react"
import NotesCard from "@/components/NotesCard";
import QuizCard from "@/components/QuizCard";

interface NotesGridProps{
    type: String;
}

export default function NotesGrid( {type} :  NotesGridProps){

    return (
        <>
            {type == "Notes" ? 
                <section className="grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <NotesCard
                    title="Prog 2 Notes"
                    noOfBookmarked="10"
                    dateCreated="Sept. 25, 2025"
                    creator="Ivan Ruelan"
                    tag="Prog II"
                    description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                />
                <NotesCard
                    title="Prog 2 Notes"
                    noOfBookmarked="10"
                    dateCreated="Sept. 25, 2025"
                    creator="Ivan Ruelan"
                    tag="Prog II"
                    description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                />
                <NotesCard
                    title="Prog 2 Notes"
                    noOfBookmarked="10"
                    dateCreated="Sept. 25, 2025"
                    creator="Ivan Ruelan"
                    tag="Prog II"
                    description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                />
                <NotesCard
                    title="Prog 2 Notes"
                    noOfBookmarked="10"
                    dateCreated="Sept. 25, 2025"
                    creator="Ivan Ruelan"
                    tag="Prog II"
                    description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                />
                <NotesCard
                    title="Prog 2 Notes"
                    noOfBookmarked="10"
                    dateCreated="Sept. 25, 2025"
                    creator="Ivan Ruelan"
                    tag="Prog II"
                    description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                />
                
                

                </section>
                :
                <section className="grid grid-cols-1 gap-2 sm:mx-2 md:mx-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
                <QuizCard
                            title="Prog 2 Notes Quiz"
                            noOfBookmarked="10"
                            noOfQuestions="28"
                            creator="Ivan Ruelan"
                            tag="Prog II"
                            description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                        />
                        <QuizCard
                            title="Prog 2 Notes Quiz"
                            noOfBookmarked="10"
                            noOfQuestions="28"
                            creator="Ivan Ruelan"
                            tag="Prog II"
                            description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                        />
                        <QuizCard
                            title="Prog 2 Notes Quiz"
                            noOfBookmarked="10"
                            noOfQuestions="28"
                            creator="Ivan Ruelan"
                            tag="Prog II"
                            description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                        />
                        <QuizCard
                            title="Prog 2 Notes Quiz"
                            noOfBookmarked="10"
                            noOfQuestions="28"
                            creator="Ivan Ruelan"
                            tag="Prog II"
                            description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                        />
                        <QuizCard
                            title="Prog 2 Notes Quiz"
                            noOfBookmarked="10"
                            noOfQuestions="28"
                            creator="Ivan Ruelan"
                            tag="Prog II"
                            description="Created from the depths of hell of Programming 2 in my 2nd semestral of college life"
                        />
                
                

            </section>
            }
            
        </>
    )
}
