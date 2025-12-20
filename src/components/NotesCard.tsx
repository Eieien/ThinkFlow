import {Bookmark, EllipsisVertical, MoreVertical} from "lucide-react";
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
import { Button } from "@/components/ui/button";
import SidebarDropdown from "./sidebar/SidebarDropdown";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { Note } from "@/configs/DataTypeConfig";
import { useState } from "react";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useActions } from "@/hooks/useActions";
import { useDataContext } from "@/hooks/useDataContext";

interface NotesCardProps{
    note: Note,
    tag?: String;
    navigate?: () => void;
}

export default function NotesCard({note, navigate} : NotesCardProps){

    // const {setUserNotes, setBookmarks} = useDataContext();
    const lastEdited = new Date(note.updatedAt);
    const options = {year: 'numeric', month: 'numeric', day: 'numeric' }
    return (
        <div className="w-full card hover:bg-light-2 transition cursor-pointer break-words" onClick={navigate}>
            <div className="flex justify-between">
                <h1 className="text-lg font-bold ">{note.title}</h1>
                <div className="flex gap-2 justify-between ">
                    <h3 className="text-sm text-dark-border dark:text-light-border">{lastEdited.toLocaleDateString('en-US', options)}</h3>
                    <SidebarDropdown note={note}/>
                </div>
            </div>
            <div className="flex gap-1">
                <div className="px-2.5 py-0.5 border border-light-border rounded-full">
                    wuwa
                </div>
            </div>
            <h2 className="text-dark-4 break-words">
                {note.description}
            </h2>

        </div>
    )
}