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
    const {state} = useSidebar();
    const {auth, setAuth } = useAuth();
    const navigate = useNavigate();
    const {onCreateNote, deleteNote, handleBookmark} = useActions();
    const {userNotes, bookmarks} = useDataContext();

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
                    <Dialog>
                        <DialogTrigger className="w-full flex items-center gap-1">
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
                                <SidebarMenuButton>
                                    <Search />
                                    {state !== "collapsed" && <span>Search</span>}
                                    
                                </SidebarMenuButton>
                                {state !== "collapsed" && <SidebarMenuBadge>Ctrl + k</SidebarMenuBadge>}
                            </ConditionalWrapper>

                        </DialogTrigger>
                        <DialogContent className="min-h-60 flex flex-col justify-start">
                            <DialogTitle>Search</DialogTitle>
                            <DialogHeader>
                                <Input id="search" type="text" placeholder="Wuthering Waves notes..."/>

                            </DialogHeader>
                        </DialogContent>

                    </Dialog>
                </SidebarMenuItem>
            </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
            <SidebarSeparator />
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
                    <SidebarDropdown note={item}/>
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
            <SidebarSeparator />
            <SidebarGroup>
            <SidebarGroupLabel>Bookmarks</SidebarGroupLabel>
            <SidebarGroupContent>
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
                        <SidebarDropdown note={item}/>

                    </SidebarMenuItem>
                ))}
                </SidebarMenu>
            </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
            <SidebarMenu >
                <SidebarMenuItem >
                    <SidebarMenuButton >
                        <DropdownMenu >
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton >
                                    <div className="flex gap-1 ">
                                        <img src={Ian}
                                        className="w-10 h-10 rounded-full"/>
                                        <div className={`${state === "collapsed" ? "opacity-0" : "opacity-100"} transition duration-75 `}>
                                            <h2 className="text font-bold">
                                                Ivan Paul RUelan
                                            </h2>
                                            <p className="text-xs">
                                                Johndoe@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                            >
                            <DropdownMenuItem className="flex gap-1">
                                <img src={Ian} className="w-13 h-13 object-contain rounded-full"/>
                                <div className={``}>
                                    <h2 className="text-lg font-bold">
                                        Ivan Paul RUelan
                                    </h2>
                                    <p className="text-sm">
                                        Johndoe@gmail.com
                                    </p>
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
                        
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarFooter>
        </Sidebar>
    )
}