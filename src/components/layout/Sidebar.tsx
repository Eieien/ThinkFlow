import react, {useState, useEffect} from "react";
import { Columns2 } from 'lucide-react';
import Logo from "../LogoStyle";

interface SidebarProps{
    collapsed: boolean;
    toggleSidebar: () => void;
}

export default function Sidebar({collapsed, toggleSidebar}: SidebarProps){

    return (
        <div id="sidebar" className={`${collapsed ? "w-16" : "w-60"} transition-all duration-200 fixed top-0 left-0 h-screen bg-primary-white border-r border-r-light-border`}>
            <div className="p-2">
                <div className="flex justify-between items-center">
                    <Logo type={"single"} styles="w-15"/>
                    <button onClick={toggleSidebar} className="cursor-pointer">
                        <Columns2/>                

                    </button>
                </div>
            </div>

        </div>
        
    )
}