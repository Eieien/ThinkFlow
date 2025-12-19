
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
import { Button } from "../ui/button";
import { useState, type Dispatch, type SetStateAction, useEffect } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import axiosPublic from "@/api/axiosInstances";
import { useDataContext } from "@/hooks/useDataContext";


interface GenerateQuizDialogProps{
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    id: string;
}

export default function GenerateQuizDialog({open, onOpenChange, id} : GenerateQuizDialogProps){
    
    const axiosPrivate = useAxiosPrivate();
    // const {currentNoteId} = useDataContext();

    const generateQuiz = async () => {
        try{
            console.log(id);
            const res = await axiosPrivate.post('/quizzes/generate', {
                noteId: id, // Either its the type or something
            },
            { 
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            console.log("GENERATED");
            console.log(res.status);
            console.log(res.data);
            onOpenChange(false);
        }catch(err){
            console.error(err?.response?.data);
        }
    }

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-center">Generate Quiz</DialogTitle>
                <DialogDescription className="text-center">
                    Are you sure you want to generate quiz?
                </DialogDescription>
            </DialogHeader>

            <DialogFooter className="sm:justify-center">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button type="button" onClick={generateQuiz} className="bg-light-primary-blue hover:bg-light-primary-blue cursor-pointer">
                    Generate
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}