import {useState, useEffect, useMemo, createContext} from "react"
import { useParams } from "react-router-dom"
import GuestHeader from "../components/layout/NavigationBar";
import Layout from "../components/layout/Layout";

import NotesEditor from "../components/Notes/NotesEditor";
import useAuth from "@/hooks/useAuth";
import UserLayout from "@/components/layout/User/UserLayout";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Description } from "@radix-ui/react-dialog";
import { debounce } from "@tiptap/extension-table-of-contents";

export default function Notes(){
    const {id} = useParams();

    const axiosPrivate = useAxiosPrivate();
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");


    useEffect(() => {
        const loadNote = async () => {
            try{
                const file = await axiosPrivate.get(`/notes/${id}`);
                // console.log(file);
                setFileName(file.data.title);
                setDescription(file.data.description);

            }catch(err){
                console.log(err);
            }
        }

        loadNote();
    }, [id])

    const saveTitle = async(newFileName: string) => {
        try{
            console.log(newFileName);
            const file = await axiosPrivate.get(`/notes/${id}`);
            
            const res = await axiosPrivate.put(`/notes/${id}`,{
                title: newFileName,
                description: description,
                options: file.data.options,
                tags: file.data.tags,
                access: file.data.access,
            })
            console.log("CHANGED");
            
        }catch(err){
            console.log(err);

        }
    }

    const debouncedSave = debounce(saveTitle,100);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileName(e.target.value)
        debouncedSave(e.target.value);
    }


    

    return(
        <>
            <UserLayout
                title={fileName}
                description={description}
                notesPage={true}
            >
                <div className="max-w-2xl mx-auto">
                    <input className="text-4xl focus:outline-0" value={fileName} onChange={handleChangeTitle}/>
                    <NotesEditor id={id}/>

                </div>

            </UserLayout>
        </>
    )
}