import {useState,} from "react";
import { useParams } from "react-router-dom"
import Layout from "@/components/layout/Layout";
import NavigationBar from "@/components/layout/NavigationBar"
import ian from "@/assets/images/Ian.jpg"
import { Facebook, Twitch } from "lucide-react";

export default function Users(){

    const {name} = useParams();

    return (
        <>
            <Layout
            title={name}
            description={`${name} page`}
            >   
                <NavigationBar/>
                <div className="flex gap-1">
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
                </div>
            </Layout>        
        </>
    )

}