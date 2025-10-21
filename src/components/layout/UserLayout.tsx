import {useEffect, useState, useContext, ReactNode} from "react";
import Sidebar from "../../components/layout/Sidebar"
import UserNavigationBar from "../../components/layout/UserNavigationBar"

interface UserLayoutProps{
    title: String;
    description: string;
    children: ReactNode;
    
}
export default function UserLayout({title, description, children}: UserLayoutProps){

    const [isCollapsed, setCollapse] = useState(false);

    const toggleSidebar = () => {
        setCollapse(!isCollapsed);
    }

    return(
        <>
            <title>{title}</title>
            <meta name="description" content={description}/>

            <div className="relative">
                <div className="flex">
                    <Sidebar collapsed={isCollapsed} toggleSidebar={toggleSidebar}/>
                    <section className={`${isCollapsed ? "ml-16" : "ml-60"} transition-all duration-200 flex w-full flex-col gap-2`}>
                        <UserNavigationBar/>
                        <div className="max-w-screen-lg mx-auto w-[95%]">
                            {children}

                            
                        </div>
                    </section>
                    
                </div>

            </div>

        </>

    )

}