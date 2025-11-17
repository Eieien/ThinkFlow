import {useEffect, useState, useContext, ReactNode} from "react";
import Sidebar from "../Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import ThemeSwitcher from "../../ThemeSwitcher";
interface UserLayoutProps{
    title: String;
    description: string;
    children: ReactNode;
    
}
export default function UserLayout({title, description, children}: UserLayoutProps){


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
                            <h1>{title}</h1>
                        </div>
                        <ThemeSwitcher/>
                    </div>
                    <section className="w-full">
                        <div className="max-w-sm xl:max-w-4xl lg:max-w-2xl md:max-w-xl sm:max-w-md mx-auto flex  gap-2">
                            <div className=" p-2 rounded-md w-full">
                                {children}

                            </div>
                        </div>
                    </section>
                </main>
            </SidebarProvider>


        </>

    )

}