import react from "react";
import { Link } from "react-router-dom";

export default function Hero(){

    return (
        <>
            <section className="relative w-full min-h-screen">
                <div className="absolute inset-0 top-40 left-0">
                    <div className="text-center flex flex-col justify-center items-center gap-2">

                        <div className="flex w-full justify-center">
                            <h1 className="text-6xl text-center max-w-3xl font-bold">
                                Change your Way of <span>thinking</span> with <span>AI</span>
                            </h1>

                        </div>
                        <div className="flex w-full justify-center">
                            <p className="text-2xl font-medium max-w-2xl text-dark-4 dark:text-light-4">
                                Transform the Way You Study With AI-Generated Quizzes From Your Own Notes
                            </p>

                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <Link to="/explore" >
                                <button 
                                className="px-4 py-2 border border-primary-dark text-primary-dark dark:border-primary-white dark:text-white rounded-md cursor-pointer">
                                    View Published Notes
                                </button>
                             </Link>

                            <Link to="/">
                            <button 
                            className="px-4 py-2 bg-light-primary-blue dark:bg-dark-primary-blue text-primary-white rounded-md cursor-pointer">
                                Create your notes
                            </button>
                            </Link>
                        </div>

                    </div>

                </div>

            </section>
        
        </>

    )

}