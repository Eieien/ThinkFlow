import {useEffect, useState, useContext, ReactNode} from "react";
import Sidebar from "../../components/layout/Sidebar"
import UserNavigationBar from "../../components/layout/UserNavigationBar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import ThemeSwitcher from "../ThemeSwitcher";
interface UserLayoutProps{
    title: String;
    description: string;
    children: ReactNode;
    
}
export default function UserLayout({title, description, children}: UserLayoutProps){

    const [isCollapsed, setCollapse] = useState(localStorage.getItem("collapsed") === "true" ? true : false);

    useEffect(() => {
        const collapsed = localStorage.getItem("collapsed") === "true" ? true : false;
        setCollapse(collapsed);
    }, [])

    const toggleSidebar = () => {
        setCollapse(!isCollapsed);
        const collapsed = !isCollapsed;
        localStorage.setItem("collapsed", collapsed.toString());
    }

    return(
        <>
            <title>{title}</title>
            <meta name="description" content={description}/>

            <SidebarProvider>
                <AppSidebar />
                <main className="w-full">
                    <div className="flex justify-between gap-2 items-center px-1 py-2">
                        <div className="flex gap-2 items-center">
                            <SidebarTrigger/>
                            <h1>Page Title</h1>
                        </div>
                        <ThemeSwitcher/>
                    </div>
                    <section className="w-full">
                        <div className="max-w-sm xl:max-w-4xl lg:max-w-4xl md:max-w-xl sm:max-w-md mx-auto flex  gap-2">
                            <div>
                                {children}

                            </div>

                        </div>

                    </section>
                </main>
            </SidebarProvider>
            
            {/* <div className="relative">
                <div className="flex">
                    <Sidebar collapsed={isCollapsed}/>
                    <section className={`${isCollapsed ? "ml-16" : "ml-60"} transition-all duration-200 flex w-full flex-col gap-2`}>
                        <UserNavigationBar collapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
                        <div className="max-w-screen-lg mx-auto w-[95%]">
                            {children}

                            
                        </div>
                    </section>
                    
                </div>

            </div> */}

        </>

    )

}