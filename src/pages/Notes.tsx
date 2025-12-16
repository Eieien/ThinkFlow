import {useState, useEffect, useMemo} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";

import NotesEditor from "../components/Notes/NotesEditor";
import useAuth from "@/hooks/useAuth";
import UserLayout from "@/components/layout/User/UserLayout";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";

export default function Notes(){
    const {id} = useParams();

    const axiosPrivate = useAxiosPrivate();
    const [fileContent, setFileContent] = useState("");
    const [fileName, setFileName] = useState("");

    useEffect(() => {
        const loadNote = async () => {
            try{
                const file = await axiosPrivate.get(`/notes/${id}`);
                console.log(file);
                setFileContent(file.data.fileContent);
                setFileName(file.data.title);

            }catch(err){
                console.log(err);
            }
        }

        loadNote();
    })

    return(
        <>
            <UserLayout
                title={fileName}
                description="Wuwa"
            >
                <div className="max-w-2xl mx-auto">
                    <input className="text-4xl focus:outline-0" value={fileName}/>
                    <NotesEditor file={fileContent}/>

                </div>

            </UserLayout>
        </>
    )
}