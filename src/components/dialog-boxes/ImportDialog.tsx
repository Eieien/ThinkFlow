
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
import { useDataContext } from "@/hooks/useDataContext";
import { useActions } from "@/hooks/useActions";
import { type Note, type Users} from "@/configs/DataTypeConfig";
import useAuth from "@/hooks/useAuth";
import Ian from "@/assets/images/Ian.jpg"
import { axiosPrivate } from "@/api/axiosInstances";

interface ImportDialogProps{
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileUpload?: () => void;
}

export default function ImportDialog({open, onOpenChange,  onFileChange, onFileUpload} : ImportDialogProps){

    const [showEmpty, setShowEmpty] = useState(false);

    const handleImports = ( ) => {
        onFileUpload();
        onOpenChange(false);
    }
    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Import</DialogTitle>
                <DialogDescription>
                    <span className="text-light-error">Note: Importing will override existing data</span>
                </DialogDescription>
            </DialogHeader>
            
            {showEmpty && 
                <DialogTitle>The Input is Empty, please select a file!</DialogTitle>
            
            }
        
            <div className="flex items-center gap-2">
            
                <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    File:
                </Label>
                <Input type="file" onChange={onFileChange} />
                </div>
            </div>
            <DialogFooter className="sm:justify-end">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Cancel
                </Button>
                <Button type="button" onClick={handleImports} className="bg-light-primary-blue hover:bg-light-primary-blue cursor-pointer">
                    Import
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}