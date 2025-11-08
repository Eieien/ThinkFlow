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
import { Link } from "react-router"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import ConditionalWrapper from "./layout/ConditionalWrapper"
import { Children } from "react"

  const notes = [
    {
        // Fetch notes Here
        title: "Wuwa",
        url: "#", // url of website
        icon: Notebook
    }
  ]

  const bookmarks = [
    {
        // Fetch bookmark data
        title: "Wuwa",
        url: "#", // url of website
        icon: Bookmark
    }
  ]

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
            <SidebarGroupLabel>Notes</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                {notes.map((item) => (
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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction>
                                <MoreVertical/>
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                            <DropdownMenuItem>
                                <span>Share</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                                Add Note
                            </TooltipContent>
                        </Tooltip>
                    )}>
                    <Link to="/Notes" target="_blank" rel="noopener noreferrer">
                        <SidebarMenuButton>
                            <Plus/>
                            <span>Add Note</span>

                        </SidebarMenuButton>
                    
                    </Link>

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
                            <a href={item.url}>
                            <item.icon />
                            {state !== "collapsed" && <span>{item.title}</span>}
                            
                            </a>
                        </SidebarMenuButton>

                        </ConditionalWrapper>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction>
                                <MoreVertical/>
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent side="right" align="start">
                            <DropdownMenuItem>
                                <span>Share</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <span>Delete</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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
                            side="right"
                            className="w-70 ml-1 mb-2 bg-primary-white rounded-md border border-border-light p-2 dark:bg-primary-dark"
                            >
                            <DropdownMenuItem className="flex gap-1">
                                <img src={Ian} className="w-13 h-13 rounded-full"/>
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
                                <span>Settings</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex gap-2">
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