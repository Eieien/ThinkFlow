import {useEffect, useState, useContext, ReactNode} from "react";
import Sidebar from "../Sidebar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import ThemeSwitcher from "../../ThemeSwitcher";
import { Button } from "@/components/ui/button";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
interface UserLayoutProps{
    title: String;
    description: string;
    children: ReactNode;
    
}
export default function UserLayout({title, description, children}: UserLayoutProps){
    const [file, setFile] = useState<File | null>(null);
    const [message, setMessage] = useState("");
    const [data, setData] = useState("");

    const axiosPrivate = useAxiosPrivate();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setFile(e.target.files[0])
        }
    }
    const handleFileUpload = async() => {

        if(!file){
            alert("Pleaase select a file")
            return;
        }
        const formData = new FormData();
        formData.append("content", file);

        const postRes = await axiosPrivate.post(
            '/notes/import',
            formData,
            {
                headers:{
                    "Content-Type": "multipart/form-data"
                } 
            }
        );
        setData(postRes.data.html);
        console.log(postRes.data.html)
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
                            <h1>{title}</h1>
                        </div>
                        <div className="flex gap-2 items-center">
                            <Button>Import Note</Button>                            
                            <ThemeSwitcher/>
                        </div>
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