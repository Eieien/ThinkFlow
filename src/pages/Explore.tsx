import React, { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import NavigationBar from "../components/layout/NavigationBar";
import {Funnel, NotebookText, Pencil} from "lucide-react";
import NotesCard from "../components/NotesCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import NotesGrid from "@/components/layout/NotesGrid";

export default function Explore() {

    const [CardType, setCardType] = useState<String>("Notes");

    useEffect(() => {

        const savedCardType = localStorage.getItem("Card Type") || "Notes";
        setCardType(savedCardType);

    }, [])

    const handleCardTypes = (type: String) => {
        setCardType(type);
        localStorage.setItem("Card Type", String(type));
    }
    return (
        <>
            <Layout
            title="Global Repository"
            description="testing sidebar"
            >
                <section className="relative">
                    <NavigationBar/>
                    <section className="mb-8 flex flex-row justify-between items-center">
                        <div className="flex justify-between gap-2">
                            <button 
                            className="user-buttons"
                            onClick={() => handleCardTypes("Notes")}>
                                <NotebookText className="h-5"/>
                                Notes
                            </button>

                            <button 
                            className="user-buttons"
                            onClick={() => handleCardTypes("Quiz")}>
                            
                                <Pencil className="h-5"/>
                                Quizzes
                            </button>

                        </div>
                        <div className="flex items-center justify-between gap-1">
                            <input
                                type="search"
                                placeholder="Search"
                                className="auth-input"
                            />

                            <div className="relative">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex gap-1 items-center user-buttons">
                                        <Funnel className="h-5" />
                                        Filter
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            Ascending
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Descending
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                               
                            </div>
                        </div>
                    </section>

                    <NotesGrid type={CardType}/>

                </section>
            </Layout>
        </>
    );
}