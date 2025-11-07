import react, {useState, useEffect} from "react"
import UserLayout from "../components/layout/UserLayout"
import NotesCard from "@/components/NotesCard"
import QuizCard from "@/components/QuizCard"
import {Bookmark, Notebook, Pen, FilePlus, Filter} from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
export default function Home(){

    const [CardType, setCardType] = useState<String>("Notes");

    useEffect(() => {

        const savedCardType = localStorage.getItem("Card Type") || "Notes";
        setCardType(savedCardType);

    }, [])
    const handleNoteCards = (type: String) => {
        setCardType(type);
        localStorage.setItem("Card Type", String(type));
    }

    return(
        <>
            <UserLayout
                title="Home"
                description="testing sidebar"
                >
                
                <div className="flex justify-between items-center mb-2">
                    <div className="flex gap-2 ">
                        <button onClick={() => handleNoteCards("Notes")} className="user-buttons">
                            <Notebook className="w-5 h-5"/>
                            <span>Notes</span>
                        </button>
                        <button onClick={() => handleNoteCards("Quizzes")} className="user-buttons">
                            <Pen className="w-5 h-5"/>
                            <span>Quiz</span>
                            
                        </button>

                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => handleNoteCards("Bookmarks")} className="user-buttons">
                            <Bookmark className="w-5 h-5"/>
                            <span>Bookmarks</span>
                            
                        </button>
                        <Dialog>
                            <DialogTrigger className="user-buttons">
                                <FilePlus className="w-5 h-5"/>
                                <span>Add note</span>
                                </DialogTrigger>
                            <DialogContent>
                                <DialogTitle className="font-bold">Create note</DialogTitle>    
                                <DialogDescription>Create or import a new note to start writing</DialogDescription>
                                <DialogHeader>
                                    <Label>Import</Label>
                                    <Input id="note-import" type="file"/>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button variant="outline">Wuwa</Button>
                                    <Button className="bg-light-primary-blue hover:bg-light-secondary-blue" type="submit">Create</Button>
                                </DialogFooter>
                            
                            </DialogContent>                                
                        </Dialog>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="user-buttons">
                                <Filter className="w-5 h-5"/>
                                <span>Filter</span>

                            </DropdownMenuTrigger>  
                            <DropdownMenuContent>
                                <DropdownMenuLabel className="text-sm">Tag</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                    <div className="flex flex-col items-center gap-2 my-4">
                                        <div className="flex items-center gap-1">
                                            <Checkbox id="tag-name"/>
                                            <Label htmlFor="tag-name" className="px-2 py-1 border border-light-primary-blue rounded-md">Wuwa Tag</Label>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Checkbox id="tag-name"/>
                                            <Label htmlFor="tag-name" className="px-2 py-1 border border-light-primary-blue rounded-md">Wuwa Tag</Label>
                                        </div>
                                    </div>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>Ascending</DropdownMenuItem>
                                <DropdownMenuItem>Descending</DropdownMenuItem>
                            </DropdownMenuContent>  
                        </DropdownMenu>   
                    </div>
                </div>

                    {CardType == "Notes" ? 
                    
                    (
                        <div className="grid grid-cols-2 gap-2">
                            <NotesCard/>
                            <NotesCard/>
                            
                        </div>

                    ) : (
                        <div className="grid grid-cols-2 gap-2">

                            <QuizCard
                            title={"QUIZ"}/>
                            <QuizCard
                            title={"QUIZ"}/>
                            <QuizCard
                            title={"QUIZ"}/>

                        </div>
                    )}


               

            </UserLayout>
        </>

    )
    
}