import React, {ReactNode} from "react";
import GuestNavigationBar from "./GuestNavigationBar";

interface LayoutProps{
    title: string;
    description: string;
    children: ReactNode;
}

export default function Layout({title, description, children} : LayoutProps){

    return(
        <>
            <div>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </div>
            <GuestNavigationBar/>
            <div className="antialiased max-w-screen-xl mx-auto flex flex-col justify-center">
                <div className="min-h-screen w-full">
                    {children}

                </div>

            </div>

        
        </>
    )
}