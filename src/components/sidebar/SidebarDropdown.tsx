import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
    useSidebar,
    SidebarMenuBadge,
    SidebarMenuAction,
  } from "@/components/ui/sidebar"
import { useActions } from "@/hooks/useActions";
import { MoreVertical } from "lucide-react";
import { useActionData } from "react-router-dom";
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
import { useState } from "react";
import type { Note } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDataContext } from "@/hooks/useDataContext";
import ShareDialog from "../dialog-boxes/ShareDialog";
interface SidebarDropdownProps{

    note: Note
}

export default function SidebarDropdown({note} : SidebarDropdownProps){
    
    const {handleBookmark, deleteNote} = useActions();
    const [openShare, setOpenShare] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const createdDate = new Date(note.createdAt);
    const lastUpdatedDate = new Date(note.updatedAt);
    const axiosPrivate = useAxiosPrivate();
    
    const [newTitle, setNewTitle] = useState(note.title);
    const [newDescription, setNewDescription] = useState(note.description);
    
    const [newOptions, setNewOptions] = useState(note.options);
    const [newTags, setNewTags] = useState(note.tags);

    const {setUserNotes, setBookmarks} = useDataContext();

    const handleEditDetails = async () => {
      try{
        const res = await axiosPrivate.put(`/notes/${note._id}`, 
        {
          title: newTitle,
          description: newDescription,
          options: {
              isPublic: note.options.isPublic,
              bookmarked: note.options.bookmarked,
          },
          tags: note.tags,
          access: note.access,
        });

        setUserNotes(prevNotes => 
          prevNotes.map(curr => 
              curr._id === note._id 
              ? { ...curr, title: newTitle, description: newDescription }
              : curr
          )
        );

        if(note.options.bookmarked){
          setBookmarks(prevNotes => 
            prevNotes.map(curr => 
                curr._id === note._id 
                ? { ...curr, title: newTitle, description: newDescription }
                : curr
            )
          );
        }

      }catch(err){
        console.error(err);
      }

      setOpenEdit(false);
    }

    const handleTitleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setNewTitle(e.target.value);
    }

    const handleDescriptionChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      setNewDescription(e.target.value);
    }
    
    return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuAction>
              <MoreVertical/>
            </SidebarMenuAction>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start">
            <DropdownMenuItem onSelect={() => setOpenEdit(true)}>
              <span>Options</span>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpenShare(true)}>
              <span>Share</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {handleBookmark(note._id)}}>
              <span>{(note.options.bookmarked) ? "Remove from Bookmark" : "Add to Bookmark"}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => {deleteNote(note._id);}}>
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    
        <ShareDialog open={openShare} note={note} onOpenChange={setOpenShare}/> 

        
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Options</DialogTitle>
              <DialogDescription>
                <div className="flex flex-col gap-2">
                Created by {note.creator.username} on {createdDate.toLocaleString()}
                <br/>
                Last updated at {lastUpdatedDate.toLocaleString()}
                <div>
                  {note.options.isPublic ? "Public" : "Private"}
                </div>

                </div>

              </DialogDescription>
            </DialogHeader>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="fileName" className="sr-only">
                  Title
                </Label>
                <Input
                  id="fileName"
                  defaultValue={`${note.title}`}
                  onChange={handleTitleChange}
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="grid flex-1 gap-2">
                <Label htmlFor="fileDescription" className="sr-only">
                  Description
                </Label>
                <Input
                  id="fileDescription"
                  defaultValue={`${note.description}`}
                  onChange={handleDescriptionChange}
                />
              </div>
            </div>
            <DialogFooter className="sm:justify-end">
                <Button type="button" variant="outline" onClick={() => setOpenEdit(false)}>
                  Close
                </Button>
                <Button type="button" onClick={handleEditDetails} className="bg-light-primary-blue hover:bg-light-primary-blue cursor-pointer">
                  Update
                </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );

}