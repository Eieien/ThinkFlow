import {useState, useEffect, useMemo} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";

import NotesEditor from "../components/Notes/NotesEditor";

export default function Notes(){
    const {id} = useParams();

    return(
        <>
            <Layout
                title={id?.toString()}
                description="Wuwa"
            >
                <GuestHeader/>
                <div className="max-w-2xl mx-auto">
                    <NotesEditor/>

                </div>

            </Layout>
        </>
    )
}