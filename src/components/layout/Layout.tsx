import useAuth from "@/hooks/useAuth";
import React, {ReactNode, useEffect, useState} from "react";
import UserLayout from "./User/UserLayout";
import GuestLayout from "./Guest/GuestLayout";

interface LayoutProps{
    title: string;
    description: string;
    children: ReactNode;
}

export default function Layout({title, description, children} : LayoutProps){

    const {auth} = useAuth();
    const [loggedIn, isLoggedIn] = useState();

    useEffect(() => {

        console.log(auth);

    }, [])

    return(
        <>
            {Object.keys(auth).length == 0 ? 
                <GuestLayout title={title} description={description} children={children}/>
                :
                <UserLayout title={title} description={description} children={children}/>
            }
            

        
        </>
    )
}