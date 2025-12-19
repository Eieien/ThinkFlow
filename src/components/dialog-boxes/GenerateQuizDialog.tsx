
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
import { useState, type Dispatch, type SetStateAction, useEffect, useRef } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import axiosPublic from "@/api/axiosInstances";
import { useDataContext } from "@/hooks/useDataContext";
import LogoStyle from "../LogoStyle";
import { useNavigate } from "react-router-dom";


interface GenerateQuizDialogProps{
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    id: string;
}

export default function GenerateQuizDialog({open, onOpenChange, id} : GenerateQuizDialogProps){
    
    const axiosPrivate = useAxiosPrivate();
    // const {currentNoteId} = useDataContext();
    const [generate, setGenerate] = useState(false);
    const navigate = useNavigate();
    const [timer, setTimer] = useState(0);
    const timerRef = useRef<number | null>(null);

    const generateQuiz = async () => {
        setGenerate(true);
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

            navigate("/")
            console.log(res.data.createdQuiz._id);
            setGenerate(false);

            if(timerRef.current){
                clearInterval(timerRef.current);
            }
            setTimer(0);
            onOpenChange(false);
        }catch(err){
            console.error(err?.response?.data);
        }
    }
    useEffect(() => {
        if(!generate)return;
        const intervalId = setInterval(() => {
            setTimer(prev => prev + 1);
        }, 1000);
        timerRef.current = intervalId;
    }, [generate]);

    const convertSecondsToTime = (s:number) => {
        const mins = Math.floor(s/60);
        const secs = s % 60;

        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-center">Generate Quiz</DialogTitle>
                {generate ? 
                    <DialogDescription className="flex flex-col w-full justify-center items-center text-center">
                        <LogoStyle type="single" styles="w-20 h-20"/>
                        <h1>Generating Quiz...</h1>
                        <h1>{convertSecondsToTime(timer)}</h1>
                    </DialogDescription>
                    :
                    <DialogDescription className="text-center">
                        Are you sure you want to generate quiz, you want be able to cancel once it starts generating
                    </DialogDescription>
                
                }
            </DialogHeader>

                

            {!generate && 
                <DialogFooter className="sm:justify-center">
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button type="button" onClick={generateQuiz} className="bg-light-primary-blue hover:bg-light-primary-blue cursor-pointer">
                        Generate
                    </Button>
                </DialogFooter>
            }
            
            </DialogContent>
        </Dialog>
    )
}