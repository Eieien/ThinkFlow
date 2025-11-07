import {useState,} from "react";
import { useParams } from "react-router-dom"
import Layout from "@/components/layout/Layout";
import NavigationBar from "@/components/layout/NavigationBar"
import ian from "@/assets/images/Ian.jpg"
import { Facebook, Twitch, Notebook, Pen } from "lucide-react";
import NotesGrid from "@/components/layout/NotesGrid";
import {useCardType} from "@/hooks/useCardType"
export default function Users(){

    const {cardType, notes, quizzes} = useCardType();

    const {name} = useParams();

    return (
        <>
            <Layout
            title={name}
            description={`${name} page`}
            >   
                <NavigationBar/>
                <section className="flex gap-1 mb-8">
                    <img className="min-w-70 h-70 gap-2 object-cover rounded-full" src={ian}/>
                    <div className="flex flex-col justify-between">
                        <div>
                            <h1 className="text-2xl">Vangos <span className="text-dark-4">Ivan Rualen</span></h1>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum repudiandae obcaecati tenetur quas eligendi adipisci. Ipsa ratione odit alias nulla! Eum itaque in natus ea harum, esse minima eveniet temporibus?</p>
                        </div>
                        <div className="flex">
                            <Facebook/>
                            <Twitch/>
                        </div>

                    </div>
                </section>
                <div className="flex gap-2 mb-4">
                    <button onClick={notes} className="user-buttons">
                        <Notebook className="w-5 h-5"/>
                        <span>Notes</span>
                    </button>
                    <button onClick={quizzes} className="user-buttons">
                        <Pen className="w-5 h-5"/>
                        <span>Quiz</span>
                        
                    </button>

                </div>
                <NotesGrid type={cardType}/>
            </Layout>        
        </>
    )

}