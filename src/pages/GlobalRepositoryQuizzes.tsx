import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import NavigationBar from "../components/layout/NavigationBar";
import {Funnel, NotebookText, Pencil} from "lucide-react";
import QuizCard from "../components/QuizCard";

export default function GlobalRepositoryQuizzes() {
    
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

    return (
        <>
            <Layout
            title="Global Repository"
            description="testing sidebar"
            >
                <section className="relative">
                    <NavigationBar/>
                    
                    {/* ======The section where the navigation between notes, search filter, and filter button is placed======  */}
                    <section className="h-50 flex flex-row justify-between items-center">
                        <div className="flex justify-between w-55">
                            <Link to="/globalrepositorynotes">
                            <button 
                            className="font-bold border border-primary-dark text-primary-dark bg-primary-light px-4 py-0.5 rounded-md cursor-pointer dark:text-primary-white dark:border-primary-white flex flex-row justify-between items-center">
                                <NotebookText className="h-5"/>
                                Notes
                            </button>
                            </Link>
                            <button 
                            className="font-bold bg-light-primary-blue text-primary-white px-4 py-0.5 rounded-md cursor-pointer flex flex-row justify-between items-center">
                                <Pencil className="h-5"/>
                                Quizzes
                            </button>
                        </div>
                        <div className="relative flex justify-between w-70">
                            <input
                                onClick={() => setIsFilterOpen(false)}
                                type="search"
                                placeholder="Search"
                                className="auth-input py-1"
                            />

                            <div className="relative">
                                <button
                                onClick={toggleFilter}
                                className="font-bold border border-primary-dark text-primary-dark bg-primary-light px-5 py-0.5 rounded-md cursor-pointer dark:text-primary-white dark:border-primary-white flex flex-row justify-between items-center"
                                >
                                <Funnel className="h-5" />
                                Filter
                                </button>

                                {/* The dropdown appears once the button of Filter is clicked*/}
                                {isFilterOpen && (
                                <div className="absolute top-full w-26 right-0 border border-primary-dark bg-primary-white dark:bg-primary-dark dark:border-primary-white rounded-md">
                                    <ul className="flex flex-col text-sm">
                                    <li className="px-3 py-2 hover:bg-light-2 dark:hover:bg-dark-2 cursor-pointer rounded-md">Most Questions</li>
                                    <li className="px-3 py-2 hover:bg-light-2 dark:hover:bg-dark-2 cursor-pointer rounded-md">Least Quetions</li>
                                    <li className="px-3 py-2 hover:bg-light-2 dark:hover:bg-dark-2 cursor-pointer rounded-md">Newly Created</li>
                                    </ul>
                                </div>
                                )}
                            </div>
                        </div>
                    </section>

                    {/* ======The place where the notes will happen but just using the sample card to show the display design======  */}  

                    <section className="grid grid-cols-3 gap-5">
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
                </section>
            </Layout>
        </>
    );
}