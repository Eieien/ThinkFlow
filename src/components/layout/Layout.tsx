import React, {ReactNode} from "react";
import GuestHeader from "./GuestHeader";

interface LayoutProps{
    title: string;
    description: string;
    children: ReactNode;
}

export default function Layout({title, description, children} : LayoutProps){
    return(
        <>
            <head>
                <title>{title}</title>
                <meta name="description" content={description}/>
            </head>

            <body className="antialiased max-w-screen-xl mx-auto">
                <GuestHeader/>
                <div className="min-h-screen w-full">
                    {children}

                </div>

            </body>

        
        </>
    )
}