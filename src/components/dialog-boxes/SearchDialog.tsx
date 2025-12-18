import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Note, Quiz } from "@/configs/DataTypeConfig";
import { useActions } from "@/hooks/useActions";
import { useDataContext } from "@/hooks/useDataContext";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useNavigate } from "react-router-dom";

interface SearchDialogProps{
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SearchDialog({open, setOpen} : SearchDialogProps){
    const [query, setQuery] = useState("");
    const {filterNotesAndQuizzes} = useActions();
    const navigate = useNavigate();
    const {globalNotes, globalQuizzes} = useDataContext();

    const filteredResults = filterNotesAndQuizzes(globalNotes, globalQuizzes, query);
    
    const handleFileNavigate = (type: string, id: string) => {
        setOpen(false);
        navigate(type == "note" ? `../notes/${id}` : `../quiz/${id}`);
    }

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="min-h-60 flex flex-col justify-start">
                    <DialogTitle>Search</DialogTitle>
                    <DialogHeader>
                        <Input 
                            id="search" 
                            type="text" 
                            placeholder="Wuthering Waves notes, DSA Quizz?..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </DialogHeader>
                    
                    <div className="flex-1 overflow-y-auto max-h-50 mt-4">
                        {query && filteredResults.length === 0 && (
                            <p className="text-muted-foreground text-center py-4">
                                No results found
                            </p>
                        )}
                        
                        {filteredResults.map((item) => (
                            <button 
                                key={item._id}
                                className="p-3 w-full text-start hover:bg-accent rounded-md cursor-pointer"
                                onClick={() => handleFileNavigate(item.type, item._id)}
                            >
                                <div className="font-medium">{item.displayTitle}</div>
                                {'type' in item && (
                                    <div className="text-xs text-muted-foreground mt-1">
                                        {item.type === 'note' ? '📝 Note' : '📋 Quiz'}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}