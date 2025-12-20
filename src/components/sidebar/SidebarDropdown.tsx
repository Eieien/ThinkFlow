import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
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
import { MoreVertical, Plus, X } from "lucide-react";
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
import { type Tag, type Note } from "@/configs/DataTypeConfig";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { useDataContext } from "@/hooks/useDataContext";
import ShareDialog from "../dialog-boxes/ShareDialog";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Compact } from "@uiw/react-color";

interface SidebarDropdownProps{
  note: Note,
  onSidebar?: boolean;
}


export default function SidebarDropdown({note, onSidebar = false} : SidebarDropdownProps){
    
  const {handleBookmark, deleteNote} = useActions();
  const {userData} = useDataContext();
  const [openShare, setOpenShare] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const createdDate = new Date(note.createdAt);
  const lastUpdatedDate = new Date(note.updatedAt);
  const axiosPrivate = useAxiosPrivate();
  
  const [newTitle, setNewTitle] = useState(note.title);
  const [newDescription, setNewDescription] = useState(note.description);
  const [newOptions, setNewOptions] = useState(note.options);

  const [focused, setFocused] = useState(false);

  const [noteTags, setNoteTags] = useState<Tag[]>(note.tags);
  
  const [tagTitle, setTagtitle] = useState("");    
  
  const [tagColor, setTagColor] = useState("#FFFFFF");
  const {setUserNotes, setBookmarks, userTags, setUserTags, updateNotes} = useDataContext();

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
        tags: noteTags,
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

  const handleDescriptionChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(e.target.value);
  }
  
  const handleTagChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setTagtitle(e.target.value);
  }


  const addTag = async () => {
    try{
      const newTag = await axiosPrivate.post(`/tags/create`,
      {
        userId: userData._id,
        name: tagTitle,
        color: tagColor
      })

      console.log(newTag.data);
      const tagsList = [...noteTags, newTag.data];
      const res = await axiosPrivate.put(`/notes/${note._id}`, 
      {
        title: note.title,
        description: note.description,
        options: {
            isPublic: note.options.isPublic,
            bookmarked: note.options.bookmarked,
        },
        tags: tagsList,
        access: note.access,
      });
      setNoteTags(tagsList);
      setUserTags(prev => [...prev, newTag.data]);
      
      console.log(res.data);
      updateNotes();
    }catch(err){
      console.error(err);
    }
  }

  const addPremadeTag = async (tag: Tag) => {

    try{
      const tagsList = [...noteTags, tag];
      const res = await axiosPrivate.put(`/notes/${note._id}`, 
      {
        title: note.title,
        description: note.description,
        options: {
            isPublic: note.options.isPublic,
            bookmarked: note.options.bookmarked,
        },
        tags: tagsList,
        access: note.access,
      });
      setNoteTags(tagsList);
      updateNotes();
    }catch(err){
      console.error(err);
    }
  }

  const removeTag = async (tagId: string) => {
    try{
      const newList = noteTags.filter(tag => tag._id !== tagId);
      
      const res = await axiosPrivate.put(`/notes/${note._id}`, 
      {
        title: note.title,
        description: note.description,
        options: {
            isPublic: note.options.isPublic,
            bookmarked: note.options.bookmarked,
        },
        tags: newList,
        access: note.access,
      });
      
      setNoteTags(newList);
      console.log(res.data);
      updateNotes();
    }catch(err){
      console.error(err);
    }
  }

  const deleteUserTag = async (tagId: string) => {
    try{
      const res = await axiosPrivate.delete(`/tags/${tagId}`)

      setNoteTags(prev => prev.filter(tag => tag._id !== tagId));
      setUserTags(prev => prev.filter(tag => tag._id !== tagId));
      console.log(res.data);
      updateNotes();
    }catch(err){
      console.error(err);
    }
  }
  
  
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {onSidebar ? 
          <SidebarMenuAction>
            <MoreVertical/>
          </SidebarMenuAction> 
          :
          <MoreVertical/>}
          
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuItem onSelect={() => {setOpenEdit(true)}}>
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
              </div>

            </DialogDescription>
          </DialogHeader>
            
          <p className="text-sm">Tags: </p>
          <div className="flex  gap-1">
              {noteTags.map((tags) => 
              <div key={tags._id} className="rounded-md px-2 flex items-center gap-1 py-0.5 text-sm" style={{border: `1px solid ${tags.color}`, color: `${tags.color}`}}>
                <p>
                  {tags.name}
                </p>
                <button onClick={() => removeTag(tags._id)}>
                  <X className="w-4 p-0.5 text-black rounded-md border border-black hover:border-red-500 hover:text-red-500 h-4"/>
                </button>  
                  
              </div>)}
              <DropdownMenu >
                <DropdownMenuTrigger asChild >
                    <button className="text-sm self-start flex items-center p-0.5 hover:bg-light-2 transition border border-light-border rounded-full">
                      <Plus className="w-5 h-5"/>
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" className="p-4 min-h-50 grid grid-cols-2 gap-1">
                  <div className="flex flex-col gap-1">
                    <Label>Create New Tag: </Label>
                    <Input onChange={handleTagChange} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} placeholder="DSA"/>
                    <Compact color={tagColor} onChange={(color) => setTagColor(color.hex)}/>
                    <Button onClick={addTag}>Create</Button>

                  </div>
                  
                  <div className="p-4 overflow-scroll max-h-60 flex flex-col gap-1">
                    <div className="flex flex-col gap-1">
                      <h1>Created Tags</h1>
                      {userTags.length === 0 && <p className="text-sm">No tags found...</p>}
                      <div className=" mt-2 flex flex-col w-full gap-1">
                        {userTags.map((tags)=>
                          <button onClick={() => addPremadeTag(tags)} key={tags._id} className="cursor-pointer px-2 py-1 flex justify-between items-center rounded-md border group hover:bg-light-2 transition" style={{border: `1px solid ${tags.color}`, color: `${tags.color}`}}>
                            <span>{tags.name}</span>
                            <X 
                              className="w-4 h-4 p-0.5 border border-black rounded-full text-black hover:border-red-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                              onClick={(e) => {
                                e.stopPropagation(); 
                                deleteUserTag(tags._id);
                              }}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>

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
              <Textarea
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