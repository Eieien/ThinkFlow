import {useState, useEffect, useMemo} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";

import NotesEditor from "../components/Notes/NotesEditor";
import useAuth from "@/hooks/useAuth";
import UserLayout from "@/components/layout/User/UserLayout";

export default function Notes(){
    const {id} = useParams();


    return(
        <>
            <UserLayout
                title={id?.toString()}
                description="Wuwa"
            >
                <div className="max-w-2xl mx-auto">
                    <input className="text-4xl focus:outline-0" value={id}/>
                    <NotesEditor file={id}/>

                </div>

            </UserLayout>
        </>
    )
}