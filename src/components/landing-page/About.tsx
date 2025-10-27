import { SquarePen } from "lucide-react";
import react from "react";

export default function About(){

    return (
        <>
            <div className="w-full min-h-screen">
                <div className="text-center flex flex-col justify-center">
                    <h1 className="text-4xl text-center font-bold">
                        About Thinkflow
                    </h1>
                    <div className="flex justify-center">
                        <p className="text-xl max-w-3xl text-dark-4 dark:text-light-4">
                        ThinkFlow is a note-taking website/application that helps students study better by not only storing their notes but also turning those notes into fun, interactive quizzes with the assistance of AI. It makes learning more engaging and helps students remember what they've studied with less stress.
                        </p>

                    </div>
                    <div className="flex flex-1 justify-center items-center gap-2">
                        <div className="border inset-shadow-sm border-light-border dark:border-dark-border dark:bg-dark-2 p-2 rounded-lg flex flex-col justify-center items-center">
                            <SquarePen /> 
                            <h1 className="text-2xl">
                                Create
                            </h1>
                            <p className="w-7">
                                Create Your own Notes and share them with people
                            </p>
                        </div>
                        
                    </div>

                </div>
            </div>

        
        </>

    )

}