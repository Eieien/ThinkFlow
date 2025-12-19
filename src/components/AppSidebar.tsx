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
import { Bookmark, Home, LogOut, Notebook, Search, Settings, User2, Earth, MoreVertical, Plus } from "lucide-react"
import LogoStyle from "./LogoStyle"
import Ian from "@/assets/images/Ian.jpg"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "react-router"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import ConditionalWrapper from "./layout/ConditionalWrapper"
import { Children, useContext, useEffect, useState } from "react"
import useAuth from "@/hooks/useAuth"
import axiosPublic, { axiosPrivate } from "@/api/axiosInstances"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import type { Note, Quiz } from "@/configs/DataTypeConfig"
import { useActions } from "@/hooks/useActions"
import HomePage from "@/pages/Home"
import { useDataContext } from "@/hooks/useDataContext"
import SidebarDropdown from "./sidebar/SidebarDropdown"
import SearchDialog from "./dialog-boxes/SearchDialog"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"



  const defaultItems = [
    {
      title: "Home",
      url: "/home",
      icon: Home,
    },
    {
        title: "Explore",
        url: "/explore",
        icon: Earth,
    }
  ]



export function AppSidebar() {
    const {auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const {onCreateNote, deleteNote, handleBookmark} = useActions();
    const {userNotes, bookmarks} = useDataContext();
    const {state} = useSidebar();
    const isCollapsed = state === "collapsed"
    const [search, openSearch] = useState(false);

    useEffect(() => {
        console.log(userNotes);
    })

    async function handleLogout(){
        try {
            const res = await axiosPublic.delete(
                    '/auth/logout',
                    { withCredentials: true }
                );
            console.log(res.status);
            setAuth({});
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    }

  

    return (
     <Sidebar collapsible="icon">
        <SidebarHeader>
            <div className="flex gap-1 items-center py-1">
                <LogoStyle type="single" styles="w-8"/>
                <span className={`${state === "collapsed" ? "opacity-0 hidden" : "opacity-100"} transition duration-75`}>Thinkflow</span>

            </div>
        </SidebarHeader>
        <SidebarContent>
            <SidebarGroup>
            <SidebarGroupContent>
                <SidebarMenu>
                {defaultItems.map((item) => (
                    
                    <SidebarMenuItem key={item.title}>
                    <ConditionalWrapper
                    condition = {state === "collapsed"}
                    wrapper={ (children) =>(
                        <Tooltip>
                            <TooltipTrigger> 
                                {children}
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.title}
                            </TooltipContent>
                        </Tooltip>
                    )}>
                        <SidebarMenuButton asChild>
                            <Link to={item.url}>
                                <item.icon />
                                {state !== "collapsed" && <span>{item.title}</span>}
                            </Link>
                        </SidebarMenuButton>


                    </ConditionalWrapper>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <ConditionalWrapper
                        condition={state === "collapsed"}
                        wrapper={(children) => (
                            <Tooltip>
                                <TooltipTrigger> 
                                    {children}
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Search
                                </TooltipContent>
                            </Tooltip>
                        )}
                        >
                            <SidebarMenuButton onClick={() => openSearch(true)}>
                                <Search />
                                {state !== "collapsed" && <span>Search</span>}
                                
                            </SidebarMenuButton>
                            {state !== "collapsed" && <SidebarMenuBadge>Ctrl + k</SidebarMenuBadge>}
                    </ConditionalWrapper>

                    <SearchDialog open={search} setOpen={openSearch}/>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="max-w-[92%]"/>
            <SidebarGroup>
            {/* Sidebar Nptes */}
            <SidebarGroupLabel>Notes</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu className="max-h-50 overflow-scroll">
                {userNotes.map((item) => (
                    <SidebarMenuItem key={item._id}>
                    
                    <ConditionalWrapper
                    condition = {state === "collapsed"}
                    wrapper={ (children) =>(
                        <Tooltip>
                            <TooltipTrigger> 
                                {children}
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.title}
                            </TooltipContent>
                        </Tooltip>
                    )}>
                        <SidebarMenuButton asChild>

                        <Link to={`../notes/${item._id}`}>
                            <Notebook/>
                            {state !== "collapsed" && <span>{item.title}</span>}
                        </Link>

                        </SidebarMenuButton>

                    </ConditionalWrapper>
                    <SidebarDropdown onSidebar={true} note={item}/>
                    </SidebarMenuItem>
                ))}


                <SidebarMenuItem >
                    <ConditionalWrapper
                    condition={state === "collapsed"}
                    wrapper={(children) => (
                        <Tooltip>
                            <TooltipTrigger> 
                                {children}
                            </TooltipTrigger>
                            <TooltipContent  side="right">
                                Add Note
                            </TooltipContent>
                        </Tooltip>
                    )}>
                    <SidebarMenuButton onClick={onCreateNote}>
                        <Plus/>
                        <span>Add Note</span>

                    </SidebarMenuButton>
                    

                    </ConditionalWrapper>
                </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
            <SidebarSeparator className="max-w-[92%]"/>
            <SidebarGroup>
            <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
            <SidebarGroupContent className="max-h-50 overflow-scroll">
                <SidebarMenu>
                {bookmarks.map((item) => (
                    <SidebarMenuItem key={item.title}>
                    
                        <ConditionalWrapper
                        condition={state === "collapsed"}
                        wrapper={(children) => (
                            <Tooltip>
                            <TooltipTrigger> 
                                {children}
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                {item.title}
                            </TooltipContent>
                        </Tooltip>
                        )}>
                        <SidebarMenuButton asChild>
                            <Link to={`../notes/${item._id}`}>
                            <Bookmark />
                            {state !== "collapsed" && <span>{item.title}</span>}
                            
                            </Link>
                        </SidebarMenuButton>

                        </ConditionalWrapper>
                        <SidebarDropdown onSidebar={true} note={item}/>

                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarSeparator className="max-w-[92%]"/>
            <SidebarFooter>
            <SidebarMenu >
                <SidebarMenuItem >
                    <DropdownMenu >
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton  asChild>
                                <div className={isCollapsed ? "flex justify-center" : "flex items-center gap-3"}>
                                    <Avatar className="min-h-8 min-w-8">
                                        <AvatarImage src={Ian} alt="User" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    {!isCollapsed && (
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">John Doe</span>
                                        <span className="text-xs text-muted-foreground">john@example.com</span>
                                    </div>
                                    )}
                                </div>
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem className="flex gap-1">
                                <div className={"flex items-center gap-3"}>
                                    <Avatar className="min-h-12 min-w-12">
                                        <AvatarImage src={Ian} alt="User" />
                                        <AvatarFallback>U</AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">John Doe</span>
                                        <span className="text-xs text-muted-foreground">john@example.com</span>
                                    </div>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2">
                                <User2/>
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2">
                                <Settings/>
                                <Link to="/settings">
                                    <span>Settings</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={handleLogout} className="flex gap-2">
                                <LogOut/>
                                <span>Sign Out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                        
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
        </Sidebar>
    )
}