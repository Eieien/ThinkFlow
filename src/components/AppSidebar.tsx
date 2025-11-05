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
    SidebarMenuAction,
    useSidebar,
  } from "@/components/ui/sidebar"
import { Bookmark, Calendar, Home, Inbox, LogOut, Notebook, Search, Settings, User2 } from "lucide-react"
import LogoStyle from "./LogoStyle"
import Ian from "@/assets/images/Ian.jpg"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"

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
      url: "#",
      icon: Home,
    },
  ]

  
  export function AppSidebar() {
    const {state,
        open,
        setOpen,
        openMobile,
        setOpenMobile,
        isMobile,
        toggleSidebar,} = useSidebar();
    
    
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
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
                <SidebarMenuItem>
                    <SidebarMenuButton>
                        <Search />
                        <span>Search</span>
                    </SidebarMenuButton>
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
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
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
                    <SidebarMenuButton asChild>
                        <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                        </a>
                    </SidebarMenuButton>
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
                            side="top"
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