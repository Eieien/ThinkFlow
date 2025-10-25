import react, {useState, useEffect} from "react";
import { House, Search, Bookmark, Tag, Notebook, Plus } from 'lucide-react';
import Logo from "../LogoStyle";

interface SidebarProps{
    collapsed: boolean;
}

const sidebarData = {
    navMain :[
        {
            section: "General",
            items: [
                {
                    title: "Home",
                    icon: <House/>,
                    url: "#",
                },
                {
                    title: "Explore",
                    icon: <Search/>,
                    url: "#", 
                }
            ],
        },

        {
            section: "Notes",
            items: [
                {
                    title: "Create Note",
                    icon: <Plus/>,
                    url: "#",
                },
                // Fetch notedata here
            ],
        },
        {
            section: "Bookmarks",
            items: [
                {
                    title: "Wuwa",
                    icon: <Bookmark/>,
                    url: "#",
                },
                // Fetch Bookmark data here
            ],
        },
        {
            section: "Tags",
            items: [
                {
                    title: "Wuwa",
                    icon: <Tag/>,
                    url: "#",
                },
                // Fetch Bookmark data here
            ],
        },
        
    ]
}

export default function Sidebar({collapsed, }: SidebarProps){

    return (
        <div id="sidebar" className={`${collapsed ? "w-14" : "w-60"} transition-all duration-200 fixed top-0 left-0 h-screen bg-light-2 border-r border-r-light-border`}>
            <div className="p-2">
                <div className="flex justify-between items-center">
                    <Logo type={"single"} styles="w-15 mb-2"/>
                    
                </div>
                <div className="flex flex-col gap-2">
                    {sidebarData.navMain.map((item) => (
                        <div key={item.section} className="flex flex-col gap-2">
                            <h1 className={`${collapsed ? "hidden" : "inline-block"}`}>{item.section}</h1>
                            {item.items.map((item) => (
                                <div className="flex gap-4 cursor-pointer hover:bg-light-3 px-2 py-1 rounded-md" key={item.title}>
                                    <div className="w-5">
                                        {item.icon}
                                    
                                    </div>
                                    <h2 className={`${collapsed ? "hidden" : "inline-block"}`}>{item.title}</h2>
                                
                                </div>
                            ))}
                        
                        </div>
                    ))}
                </div>
            </div>

        </div>
        
    )
}