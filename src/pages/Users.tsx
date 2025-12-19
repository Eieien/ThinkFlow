import {useState,} from "react";
import { useParams } from "react-router-dom"
import Layout from "@/components/layout/Layout";
import NavigationBar from "@/components/layout/NavigationBar"
import ian from "@/assets/images/Ian.jpg"
import { Facebook, Twitch, Notebook, Pen } from "lucide-react";
import NotesGrid from "@/components/layout/NotesGrid";
import {useCardType} from "@/hooks/useCardType"
import UserLayout from "@/components/layout/User/UserLayout";
export default function Users(){

    const {cardType, notes, quizzes} = useCardType();

    const {name} = useParams();

    return (
        <>
            <Layout
                title="Profile"
                description='Yez'
            >
                <section className="flex max-w-350 gap-1 mb-8 p-8 border border-light-4 dark:border-dark-3 rounded-md">
                    <img className="min-w-60 max-h-60 gap-2 object-cover rounded-full" src={ian}/>
                    <div className="flex flex-col justify-between mx-8 my-5">
                        <div>
                            <h1 className="text-4xl font-bold mb-5">Vangos <span className="text-dark-4 h- mb-5 text-[20px]">Ivan Rualen</span></h1>
                            <p className="mb-5">
                                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum repudiandae obcaecati tenetur quas eligendi adipisci. Ipsa ratione odit alias nulla! Eum itaque in natus ea harum, esse minima eveniet temporibus?
                            </p>
                        </div>
                        <div className="flex gap-2">
                            <Facebook/>
                            <Twitch/>
                        </div>

                    </div>
                </section>
                <div className="flex gap-2">
                            <button 
                            className="user-buttons"
                            onClick={notes}>
                                <Notebook className="h-5"/>
                                Notes
                            </button>

                            <button 
                            className="user-buttons"
                            onClick={quizzes}>
                            
                                <Pen className="h-5"/>
                                Quizzes
                            </button>
                        </div>
                <NotesGrid type={cardType}/>
            </Layout>        
        </>
    )

}