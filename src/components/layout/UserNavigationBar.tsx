import { Columns2 } from "lucide-react";
import react ,{useState, useEffect} from "react";
import ThemeSwitcher from "../ThemeSwitcher";
interface UserNavigationBarProps{
    collapsed: boolean;
    toggleSidebar: () => void;
}
export default function UserNavigationBar({collapsed, toggleSidebar}: UserNavigationBarProps){
    
    return(
        <div className="w-full h-10 bg-primary-white border-b border-b-light-border dark:bg-primary-dark dark:border-b-dark-border flex justify-between p-2">
            <div className="flex items-center gap-2">
                <button onClick={toggleSidebar} className="text-primary-dark dark:text-primary-white cursor-pointer">
                    <Columns2/>                
                </button>
                <h1 className="text-2xl">Title</h1>

            </div>
            <div className="flex items-center gap-2">
                <ThemeSwitcher/>
            </div>


        </div>

    )


}
