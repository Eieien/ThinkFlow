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
import { useDataContext } from "@/hooks/useDataContext";

export default function Notes(){
    const {id} = useParams();

    const axiosPrivate = useAxiosPrivate();
    const [fileName, setFileName] = useState("");
    const [description, setDescription] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");
    const {currentNoteId, setCurrentNoteId} = useDataContext();
    const [importFunction, setImportFunction] = useState<((html: string) => void) | null>(null);

    
    useEffect(() => {
        const loadNote = async () => {
            try{
                const file = await axiosPrivate.get(`/notes/${id}`);
                setFileName(file.data.title);
                setDescription(file.data.description);
                setCurrentNoteId(String(id));
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
          setFile(e.target.files[0])
          return 0;
        }else{
            return 1;
        }
    }
    
    const handleFileUpload = async() => {
        if(!file){
            alert("Please select a file")
            return;
        }
        const formData = new FormData();
        formData.append("content", file);
        
        try {
            const postRes = await axiosPrivate.post(
            '/notes/import',
            formData,
            {
                headers:{
                "Content-Type": "multipart/form-data"
                } 
            }
            );
            const htmlContent = postRes.data.html;
            console.log(htmlContent);

            if (importFunction) {
            importFunction(htmlContent);
            }
        } catch (err) {
            console.error('Failed to import file:', err);
        }
    }
    

    

    return(
        <>
            <UserLayout
                title={fileName}
                description={description}
                notesPage={true}
                onFileChange={handleFileChange}
                onFileUpload={handleFileUpload}

            >
                <div className="max-w-2xl mx-auto">
                    <input className="text-4xl focus:outline-0" value={fileName} onChange={handleChangeTitle}/>
                    <NotesEditor id={id} onEditorReady={(importFn) => setImportFunction(() => importFn)}
/>

                </div>

            </UserLayout>
        </>
    )
}