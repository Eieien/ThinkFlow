import {useEffect, useState, useContext, type ReactNode} from "react";
import Sidebar from "../Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import ThemeSwitcher from "../../ThemeSwitcher";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { DataProvider } from "@/context/DataProvider";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"

  
  import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { useDataContext } from "@/hooks/useDataContext";
import { debounce } from "@tiptap/extension-table-of-contents";
  

interface UserLayoutProps{
    title: String;
    description: string;
    children: ReactNode;
    notesPage?: Boolean,    
}
export default function UserLayout({title, description, children, notesPage = false}: UserLayoutProps){
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");
    
    const [visibility, setVisibility] = useState<Boolean>(false);
    const {currentNoteId} = useDataContext();

    const axiosPrivate = useAxiosPrivate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0])
        }
    }
    const handleFileUpload = async() => {

        if(!file){
            alert("Pleaase select a file")
            return;
        }
        const formData = new FormData();
        formData.append("content", file);

        const postRes = await axiosPrivate.post(
            '/notes/import',
            formData,
            {
                headers:{
                    "Content-Type": "multipart/form-data"
                } 
            }
        );
        setData(postRes.data.html);
        console.log(postRes.data.html)
    } 

    useEffect(() => {

        try{
            const getNoteData = async () => {
                const res = await axiosPrivate.get(`/notes/${currentNoteId}`);
                // console.log(res.data[0]);
                setVisibility(res.data[0].options.isPublic);
                // console.log(visibility);
            }
  
            getNoteData();
        }catch(err){
            console.error(err);
        }
    }, [currentNoteId])

    const saveVisibility = async () => {
        try{
            const file = await axiosPrivate.get(`/notes/${currentNoteId}`);
            console.log(file.data);
            const res = await axiosPrivate.put(`/notes/${currentNoteId}`,{
                title: file.data.title,
                description: file.data.description,
                options: file.data.options,
                tags: file.data.tags,
                access: file.data.access,
            })

            console.log(res.status);

        }catch(err){
            console.error(err);
        }
    }


    const handleVisibility = (isPublic: boolean) => {
        setVisibility(isPublic);
        debounce(saveVisibility,500);
        saveVisibility();
    }



    return(
        <DataProvider>
            <title>{title}</title>
            <meta name="description" content={description}/>

            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <div className="flex justify-between gap-2 items-center px-1 py-2">
                        <div className="flex gap-2 items-center">
                            <SidebarTrigger/>
                            <h1>{title}</h1>
                        </div>
                        <div className="flex gap-2 items-center">
                            {notesPage && 
                                <div className="flex gap-2 items-center">
                                    <Button>Import Note</Button>
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button>
                                                Share
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogTitle>Visibility</DialogTitle>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button>{visibility ? "Public" : "Private"}</Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuSeparator/>
                                                    <DropdownMenuCheckboxItem onClick={() => handleVisibility(true)}>
                                                        Public
                                                    </DropdownMenuCheckboxItem>
                                                    <DropdownMenuCheckboxItem onClick={() => handleVisibility(false)}>
                                                        Private
                                                    </DropdownMenuCheckboxItem>
                                                       
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </DialogContent>                           
                                    </Dialog>                            
                                </div>}
                            <ThemeSwitcher/>
                        </div>
                    </div>
                    <section className="w-full">
                        <div className="max-w-sm xl:max-w-4xl lg:max-w-2xl md:max-w-xl sm:max-w-md mx-auto flex  gap-2">
                            <div className=" p-2 rounded-md w-full">
                                {children}
                            </div>
                        </div>
                    </section>
                </main>
            </SidebarProvider>


        </DataProvider>

    )

}