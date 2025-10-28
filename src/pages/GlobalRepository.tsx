import React, { useState } from "react";
import Layout from "../components/layout/Layout";
import NavigationBar from "../components/layout/NavigationBar";
import {Funnel, NotebookText, Pencil} from "lucide-react";
import NotesCard from "../components/NotesCard";

export default function GlobalRepository() {
    return (
        <>
            <Layout
            title="Home"
            description="testing sidebar"
            >
                <section className="relative">
                    <NavigationBar/>
                </section>

                {/* ======The section where the navigation between notes, search filter, and filter button is placed======  */}
                <section className="h-50 flex flex-row justify-between items-center">
                    <div className="flex justify-between w-55">
                        <button 
                        className="font-bold bg-light-primary-blue text-primary-white px-4 py-0.5 rounded-md cursor-pointer flex flex-row justify-between items-center">
                            <NotebookText className="h-5"/>
                            Notes
                        </button>
                        <button 
                        className="font-bold border border-primary-dark text-primary-dark bg-primary-light px-4 py-0.5 rounded-md cursor-pointer dark:text-primary-white dark:border-primary-white flex flex-row justify-between items-center">
                            <Pencil className="h-5"/>
                            Quizzes
                        </button>
                    </div>
                    <div className="flex justify-between w-70">
                        <input type="search" placeholder="Search" className="auth-input py-1"/>
                        <button
                        className="font-bold border border-primary-dark text-primary-dark bg-primary-light px-4 py-0.5 rounded-md cursor-pointer dark:text-primary-white dark:border-primary-white flex flex-row justify-between items-center">
                            <Funnel className="h-5"/>
                            Filter
                        </button>
                    </div>
                </section>
                {/* ======================================================================================================  */}

                {/* ======The place where the notes will happen======  */}
                <section className="grid grid-cols-3 gap-5">
                    <NotesCard
                        title="Prog 2 Notes"
                        dateCreated="Created on Sept. 25, 2025"
                        creator="Ivan Ruelan"
                        description="Stuff ioxdfhusdoifjuspdofgujisdopigsioujj"
                    />
                    <NotesCard
                        title="Prog 2 Notes"
                        dateCreated="Created on Sept. 25, 2025"
                        creator="Ivan Ruelan"
                        description="Stuff ioxdfhusdoifjuspdofgujisdopigsioujj"
                    />
                    <NotesCard
                        title="Prog 2 Notes"
                        dateCreated="Created on Sept. 25, 2025"
                        creator="Ivan Ruelan"
                        description="Stuff ioxdfhusdoifjuspdofgujisdopigsioujj"
                    />
                    <NotesCard
                        title="Prog 2 Notes"
                        dateCreated="Created on Sept. 25, 2025"
                        creator="Ivan Ruelan"
                        description="Stuff ioxdfhusdoifjuspdofgujisdopigsioujj"
                    />
                </section>      
                {/* =================================================  */}
            </Layout>
        </>
    );
}