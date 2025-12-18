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
import ImportDialog from "@/components/dialog-boxes/ImportDialog";
import GenerateQuizDialog from "@/components/dialog-boxes/GenerateQuizDialog";
  

interface UserLayoutProps{
    title: String;
    description: string;
    children: ReactNode;
    notesPage?: Boolean,    
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUpload?: () => void;
    id?: string;
}
export default function UserLayout({title, description, children, notesPage = false, onFileChange, onFileUpload, id}: UserLayoutProps){
    
    const [openImport, setOpenImport] = useState(false);
    const [visibility, setVisibility] = useState<Boolean>(false);
    // const {currentNoteId, setCurrentNoteId} = useDataContext();
    const axiosPrivate = useAxiosPrivate();

    const [genereateQuiz, setGenerateQuiz] = useState(false);

    const handleOpenImport = () => {
        setOpenImport(true);
    }

    useEffect(() => {

        try{
            const getNoteData = async () => {
                const res = await axiosPrivate.get(`/notes/${id}`);
                setVisibility(res.data.options.isPublic);
                console.log("Current VISIBILITY: " + res.data.options.isPublic);
            }
            getNoteData();
        }catch(err){
            console.error(err);
        }
    }, [id])

    const saveVisibility = async (isPublic: boolean) => {
        try{
            const file = await axiosPrivate.get(`/notes/${id}`);
            const res = await axiosPrivate.put(`/notes/${id}`,{
                title: file.data.title,
                description: file.data.description,
                options: {
                    isPublic: isPublic,
                    bookmarked: file.data.options.bookmarked,
                },
                tags: file.data.tags,
                access: file.data.access,
            })
            
            console.log(visibility);

        }catch(err){
            console.error(err);
        }
    }


    const handleVisibility = (isPublic: boolean) => {
        setVisibility(isPublic);
        saveVisibility(isPublic);
    }
    
    const handleGenerateOpen = () => {
        setGenerateQuiz(true);
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
                                    <Button onClick={handleGenerateOpen}>Generate Quiz</Button>
                                    <Button onClick={handleOpenImport}>Import Note</Button>
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
            
            <GenerateQuizDialog open={genereateQuiz} onOpenChange={setGenerateQuiz} id={String(id)}/>
            <ImportDialog open={openImport} onOpenChange={setOpenImport} onFileChange={onFileChange} onFileUpload={onFileUpload}/>

        </DataProvider>

    )

}