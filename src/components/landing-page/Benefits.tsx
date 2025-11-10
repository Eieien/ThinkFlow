import { Link } from "react-router-dom";
import react from "react";

export default function Benefits(){

    return (
        <>
                <div className=" inset-0 top-40 left-0">
                    <div className="text-center flex flex-col justify-center items-center gap-2">
                        <div className="flex w-full justify-center">
                            <h1 className="text-4xl text-center max-w-3xl font-bold">
                                A Repository of notes and quizzes that you can review
                            </h1>
                        </div>

                        {/* Pic of the Art of War example in Figma */}
                        <div className="px-100 py-60 border border-light-border dark:border-dark-border dark:bg-dark-2 m-5">
                            <img src="" alt="" />
                        </div>

                    </div>

                    <div className="mt-70 mb-70 text-center flex flex-col justify-center items-center gap-2">
                        <div className="flex w-full justify-center">
                            <h1 className="text-4xl text-center max-w-3xl font-bold">
                                Ready to recreate your flow today
                            </h1>
                        </div>
                        <div className="flex justify-center">
                            <p className="text-xl max-w-3xl text-dark-4 dark:text-light-4">
                                Start creating your notes
                            </p>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <Link to="/signup" >
                                <button 
                                className="px-4 py-2 bg-light-primary-blue dark:bg-dark-primary-blue text-primary-white rounded-md cursor-pointer">
                                    Sign up now!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
        </>

    )

}
