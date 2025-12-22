
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
import { MoreVertical, X } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ShareDialogProps{
    open: boolean;
    note: Note;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
}
type UsersWithPfp{
    user: Users;
    pfp: string;
}


export default function ShareDialog({open, onOpenChange, note} : ShareDialogProps){
    
    const {usersList, userData} = useDataContext();
    const {filterPeople} = useActions();
    const [query, setQuery] = useState("");
    const [openSearch, setOpenSearch] = useState(false);
    const {auth} = useAuth();
    const [focused, setFocused] = useState(false);
    const results = filterPeople(usersList, query);
    const [hasAccess, setHasAccess] = useState<UsersWithPfp[]>([]);
    const [visibility, setVisibility] = useState<Boolean>(note.options.isPublic);

    const convertIdToUser = async (id: string) => {
        if(Object.keys(auth).length == 0) return;
        const user = await axiosPrivate.get(`/users/${id}`);
        return {
            _id: user.data._id,
            username: user.data.username,
            email: user.data.email,
            createdAt: user.data.createdAt,
            updatedAt: user.data.updatedAt,
            deactivated: user.data.deactivated
        }
    }    

    const getUserPfp = async (id: string) => {
        if(Object.keys(auth).length == 0) return "";
        const res = await axiosPublic.get(`/users/pfp/${auth.user?._id}`, {
            responseType: 'blob'
          });
  
        // Create object URL from blob
        const imageUrl = URL.createObjectURL(res.data);
    }

    useEffect(() => {
        const fetchUsers = async () => {
            if(Object.keys(auth).length == 0) return;
            if (note.access && note.access.length > 0) {
                const userPromises = note.access.map(id => convertIdToUser(id));
                const fetchedUsers = await Promise.all(userPromises);
                setHasAccess([userData, ...fetchedUsers]);
            }else{
                setHasAccess([userData]);

            }

        };
        fetchUsers();
    }, [note._id])

    const handleAccessChange = async (userId: string) => {
        console.log("ADDING");
        try{
            if(hasAccess.find(user => user._id === userId)){
                console.log("ALREADY IN ACCESS");
            }else{
                const newUser = await convertIdToUser(userId);
                const nextAccess = [...hasAccess, newUser];
                setHasAccess(nextAccess);
                console.log(nextAccess);

                const res = await axiosPrivate.put(`/notes/${note._id}`,
                {
                    title: note.title,
                    description: note.description,
                    options: {
                        isPublic: note.options.isPublic,
                        bookmarked: note.options.bookmarked,
                    },
                    tags: note.tags,
                    access: nextAccess,
                })

                console.log(hasAccess);
            }

        }catch(err){
            setHasAccess(prev => prev.filter(user => user._id !== userId));
            console.error(err);

        }
    }

    const removeAccess = async (userId: string) => {
        try{
            const nextAccess = hasAccess.filter(user => user._id !== userId);
            setHasAccess(nextAccess);
            
            const res = await axiosPrivate.put(`/notes/${note._id}`, {
                title: note.title,
                description: note.description,
                options: {
                    isPublic: note.options.isPublic,
                    bookmarked: note.options.bookmarked,
                },
                tags: note.tags,
                access: nextAccess.map(user => user._id), 
            });
            
            console.log("Access removed successfully");
        }catch(err){
            const sameUser = await convertIdToUser(userId);
            setHasAccess(prev => [...prev, sameUser]);
            console.error(err);
        }
    
    }

    const saveVisibility = async (isPublic: boolean) => {
        try{
            const file = await axiosPrivate.get(`/notes/${note._id }`);
            const res = await axiosPrivate.put(`/notes/${note._id }`,{
                title: file.data.title,
                description: file.data.description,
                options: {
                    isPublic: isPublic,
                    bookmarked: file.data.options.bookmarked,
                },
                tags: file.data.tags,
                access: file.data.access,
            })
            

        }catch(err){
            console.error(err);
        }
    }


    const handleVisibility = (isPublic: boolean) => {
        setVisibility(isPublic);
        saveVisibility(isPublic);
    }

    return(
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
            <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                    Anyone who has this link will be able to view this.
                </DialogDescription>
            </DialogHeader>
            
            <div className="relative">
                <Input
                    id="useraccess"
                    placeholder="Add People with access"
                    onChange={e => setQuery(e.target.value)}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setTimeout(() => setFocused(false), 200)}
                />
                {focused && <div className="absolute top-full max-h-50 overflow-scroll border border-light-4 mt-1 bg-primary-white w-full rounded-sm p-2 flex-col justify-start items-center gap-2">
                    {results.map(user => 
                    <Button key={user._id} onClick={() => handleAccessChange(user._id)} className="flex w-full my-2 py-6 gap-2 bg-primary-white dark:bg-primary-dark justify-start hover:bg-light-2">
                        <img src={Ian} className="w-10 h-10 object-contain rounded-full"/>
                        <div className="flex flex-col text-start text-primary-dark ">
                            <h2>
                                {user.username}
                            </h2>
                            <p className="text-sm">
                                {user.email}
                            </p>
                        </div>
                    </Button>
                )}
                </div>}
                

            </div>

            <DialogTitle className="flex justify-between items-center">
                People with Access
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant={"outline"} className="ring ring-blue-400 self-start">
                        {visibility ? "Public" : "Private"}

                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuCheckboxItem onClick={() => handleVisibility(true)}>
                            Public
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuCheckboxItem onClick={() => handleVisibility(false)}>
                            Private
                        </DropdownMenuCheckboxItem>
                            
                    </DropdownMenuContent>
                  </DropdownMenu>
            </DialogTitle>
            <div className="max-h-50 overflow-scroll flex flex-col gap-2">
                {hasAccess.length !== 0 && hasAccess.map(user => 
                    <div className="flex px-2 justify-between items-center">
                        <div className="flex w-full py-2 gap-2 bg-primary-white dark:bg-primary-dark justify-start ">
                            <Avatar className="object-contain cursor-pointer transition h-10 w-10">
                                <AvatarImage src={Ian} alt="User" />
                                <AvatarFallback>PFP</AvatarFallback>
                            </Avatar>
                            
                            {/* <img src={Ian} className="w-10 h-10 object-contain rounded-full"/> */}
                            <div className="flex flex-col text-start text-primary-dark ">
                                <h2>
                                    {user.username}
                                </h2>
                                <p className="text-sm">
                                    {user.email}
                                </p>
                            </div>

                        </div>
                        <Tooltip>
                            <TooltipTrigger >
                                <button onClick={() => removeAccess(user._id)} className="p-1  rounded-md hover:bg-light-2 transition">
                                    <X color="#ED2D4F"/>
                                </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-light-error">
                                <p>Remove User</p>
                            </TooltipContent>

                        </Tooltip>

                    </div>
                    
                    )}
            </div>

        
            <div className="flex items-center gap-2">
                
            
                <div className="grid flex-1 gap-2">
                <Label htmlFor="link" className="sr-only">
                    Link
                </Label>
                <Input
                    id="link"
                    defaultValue={`https://www.Thinkflow.com/notes/${note._id}`}
                    readOnly
                />
                </div>
            </div>
            <DialogFooter className="sm:justify-between">
                <Button type="button" variant="outline" className="ring ring-light-primary-blue" onClick={() => {navigator.clipboard.writeText(`https://www.Thinkflow.com/notes/${note._id}`)}}
>
                    Copy to Clipboard
                </Button>
                <Button type="button" onClick={() => onOpenChange(false)} className="bg-light-primary-blue hover:bg-light-primary-blue cursor-pointer">
                    Done
                </Button>
            </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}