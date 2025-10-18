import React, {ReactNode} from "react";

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

            <body className="antialiased">
                <div className="min-h-screen w-full">
                    {children}

                </div>

            </body>

        
        </>
    )
}