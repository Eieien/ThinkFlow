import { PenLine, SquarePen, Eye } from "lucide-react";
import react from "react";

export default function About(){

    return (
        <>
            <div className="mt-90 w-full min-h-screen">
                <div className="text-center flex flex-col justify-center gap-5">
                    <h1 className="text-4xl text-center font-bold">
                        About Thinkflow
                    </h1>
                    <div className="flex justify-center">
                        <p className="text-xl max-w-3xl text-dark-4 dark:text-light-4">
                            ThinkFlow is a note-taking website/application that helps students study better by not only storing their notes but also turning those notes into fun, interactive quizzes with the assistance of AI. It makes learning more engaging and helps students remember what they've studied with less stress.
                        </p>

                    </div>
                    <div className="flex flex-1 justify-center items-center gap-5 mt-20">
                        <div className="border inset-shadow-sm border-light-border dark:border-dark-border dark:bg-dark-2 p-2 rounded-lg flex flex-col justify-center items-center">
                            <PenLine className="w-25 h-25 mb-5 text-light-primary-blue dark:text-dark-primary-blue" /> 
                            <h1 className="text-4xl mb-5 font-bold">
                                Create
                            </h1>
                            <p className="text-xl w-60">
                                Create Your own Notes and share them with people
                            </p>
                        </div>

                        <div className="border inset-shadow-sm border-light-border dark:border-dark-border dark:bg-dark-2 p-2 rounded-lg flex flex-col justify-center items-center">
                            <SquarePen className="w-25 h-25 mb-5 text-light-primary-blue dark:text-dark-primary-blue" /> 
                            <h1 className="text-4xl mb-5 font-bold">
                                Test
                            </h1>
                            <p className="text-xl w-60">
                                Quiz yourself with automatic AI-made Quizzes that you can edit
                            </p>
                        </div>

                        <div className="border inset-shadow-sm border-light-border dark:border-dark-border dark:bg-dark-2 p-2 rounded-lg flex flex-col justify-center items-center">
                            <Eye className="w-25 h-25 mb-5 text-light-primary-blue dark:text-dark-primary-blue" /> 
                            <h1 className="text-4xl mb-5 font-bold">
                                View
                            </h1>
                            <p className="text-xl w-60">
                                View notes created by other people to broaden your learning
                            </p>
                        </div>
                        
                    </div>

                </div>
            </div>

        
        </>

    )

}